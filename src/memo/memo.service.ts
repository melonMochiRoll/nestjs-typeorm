import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemoCount, MemoWithHasMore } from 'src/common/interfaces';
import { Memo, MemoTag, Tag } from 'src/entities';
import { TagService } from 'src/tag';
import { Connection, Repository } from 'typeorm';
import { CreateMemoDto, UpdateMemoDto } from './dto';
import { MemoQueryRepository } from './memo.query.repository';

@Injectable()
export class MemoService {
  constructor(
    private connection: Connection,
    @InjectRepository(Memo)
    private memoRepository: Repository<Memo>,
    @InjectRepository(MemoTag)
    private memoTagRepository: Repository<MemoTag>,
    private memoQueryRepository: MemoQueryRepository,
    private readonly tagService: TagService,
  ) {}

  async getMemosByFolderName(
    userId: number,
    folderName: string,
    currentSequence: number,
    ): Promise<MemoWithHasMore> {
    const memos = await this.memoQueryRepository.getMemosByFolderName(userId, folderName, currentSequence);
    const count = await this.memoQueryRepository.getMemoCount(userId);
    const memoCount = count?.find((ele: MemoCount) => ele.folderName === folderName);
    const hasMore = memoCount.count > currentSequence || false;

    if (!memos?.length) {
      return { memos: [], hasMore };
    }
    
    return { memos, hasMore };
  }

  async getMemoCount(
    userId: number,
    ): Promise<MemoCount[]> {
    const memoCount = await this.memoQueryRepository.getMemoCount(userId);
    const defaultValue = [{ folderName: '메모', count: 0 }];

    if (!memoCount?.length) {
      return defaultValue;
    }

    return memoCount;
  }

  async createMemo(
    createMemoDto: CreateMemoDto,
    ): Promise<boolean> {
    const qr = this.connection.createQueryRunner();
    const { tags, ...withoutTags } = createMemoDto;

    await qr.connect();
    await qr.startTransaction();
    try {
      const createdMemo = await qr.manager.getRepository(Memo).save(withoutTags);
      
      await Promise.all(
        tags.split(';').map(async (tag: string) => {
          if (!!tag) {
            return;
          }
          const searchOrCreatedTag =
            await this.tagService.getTag(tag) ||
            await qr.manager.getRepository(Tag).save({ tag });
    
          await qr.manager.getRepository(MemoTag).save({
            memoId: createdMemo.id,
            tagId: searchOrCreatedTag.id,
          });
        })
      );
      
      await qr.commitTransaction();
    } catch(e) {
      console.error(e);
      await qr.rollbackTransaction();
      throw new ConflictException();
    } finally {
      await qr.release();
    }
    
    
    return true;
  }

  async updateMemo(
    updateMemoDto: UpdateMemoDto,
    ): Promise<boolean> {
    const qr = this.connection.createQueryRunner();
    const { memoId, tags, ...updateProperty } = updateMemoDto;

    await qr.connect();
    await qr.startTransaction();
    try {
      await qr.manager.getRepository(Memo).update(memoId, updateProperty);

      const oldRelations = await this.memoTagRepository.find({ memoId });
      const oldTagIds = oldRelations.map((memoTag: MemoTag) => {
        const { tagId, ..._ } = memoTag;
        return tagId;
      });

      await Promise.all(
        tags.split(';').map(async (tag: string) => {
          const searchOrCreatedTag =
            await this.tagService.getTag(tag) ||
            await qr.manager.getRepository(Tag).save({ tag });

          const remainingTag = oldTagIds.findIndex(ele => ele === searchOrCreatedTag?.id);
          if (remainingTag > -1) {
            oldTagIds.splice(remainingTag, 1);
          }

          await qr.manager.getRepository(MemoTag).save({
            memoId,
            tagId: searchOrCreatedTag.id,
          });
        })
      );

      await Promise.all(
        oldTagIds.map(async (tagId: number) => {
          await qr.manager.getRepository(MemoTag).delete({ memoId, tagId });
        })
      );

      await qr.commitTransaction();
    } catch(e) {
      console.error(e);
      await qr.rollbackTransaction();
      throw new ConflictException();
    } finally {
      await qr.release();
    }

    return true;
  }

  async deleteMemo(
    memoId: number,
    ): Promise<boolean> {
    try {
      await this.memoRepository.delete(memoId);
    } catch(e) {
      console.error(e);
      throw new ConflictException();
    }
    
    return true;
  }
}