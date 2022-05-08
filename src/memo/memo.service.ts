import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Memo, MemoTag, Tag } from 'src/entities';
import { TagService } from 'src/tag';
import { UserService } from 'src/user';
import { Connection, Repository } from 'typeorm';
import { CreateMemoDto, UpdateMemoDto } from './dto';

@Injectable()
export class MemoService {
  constructor(
    private connection: Connection,
    @InjectRepository(Memo)
    private memoRepository: Repository<Memo>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(MemoTag)
    private memoTagRepository: Repository<MemoTag>,
    private userService: UserService,
    private tagService: TagService,
  ) {}

  async getMemos(
    userId: number
    ): Promise<Memo[]> {
    const foundMemos = await this.memoRepository.find({ userId });

    if(!foundMemos?.length) {
      throw new NotFoundException('유저 정보를 찾지 못했습니다.');
    }

    return foundMemos;
  }

  async createMemo(
    createMemoDto: CreateMemoDto,
    ): Promise<boolean> {
    const qr = this.connection.createQueryRunner();
    const { tags, ...withoutTags } = createMemoDto;

    await this.userService.findByNickname(withoutTags.author);

    await qr.connect();
    await qr.startTransaction();
    try {
      const createdMemo = await qr.manager.getRepository(Memo).save(withoutTags);
      
      await Promise.all(
        tags.split(';').map(async (tag: string) => {
          if (!tag) {
            return;
          }
          const searchedTag = await this.tagService.getTag(tag);
    
          if (searchedTag) {
            await qr.manager.getRepository(MemoTag).save({
              memoId: createdMemo.id,
              tagId: searchedTag.id,
            });
            return;
          }
  
          const createdTag = await qr.manager.getRepository(Tag).save({ tag });
          await qr.manager.getRepository(MemoTag).save({
            memoId: createdMemo.id,
            tagId: createdTag.id,
          });
        })
      );
      
      await qr.commitTransaction();
    } catch(e) {
      console.error(e);
      await qr.rollbackTransaction();
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
      const remainingTagIds = [];

      const oldRelations = await this.memoTagRepository.find({ memoId });
      const oldTagIds = oldRelations.map((memoTag: MemoTag) => {
        const { tagId, ..._ } = memoTag;
        return tagId;
      });

      const newTags = await Promise.all(
        tags.split(';').map(async (tag: string) => {
        const searchedTag = await this.tagService.getTag(tag);

        if (oldTagIds.includes(searchedTag.id)) {
          remainingTagIds.push(searchedTag.id);
          return Promise.resolve(null);
        }
        return Promise.resolve(tag);
        })
      );
      
      await Promise.all(
        oldTagIds.map(async (tagId: number) => {
          if (!remainingTagIds.includes(tagId)) {
            await qr.manager.getRepository(MemoTag).delete({ memoId, tagId });
          }
        })
      );

      await Promise.all(
        newTags.map(async (tag: string) => {
          if (!tag) {
            return;
          }
          const searchedTag = await this.tagService.getTag(tag);
    
          if (searchedTag) {
            await qr.manager.getRepository(MemoTag).save({
              memoId,
              tagId: searchedTag.id,
            });
            return;
          }

          const createdTag = await qr.manager.getRepository(Tag).save({ tag });
          await qr.manager.getRepository(MemoTag).save({
            memoId,
            tagId: createdTag.id,
          });
        })
      );

      await qr.commitTransaction();
    } catch(e) {
      console.error(e);
      await qr.rollbackTransaction();
    } finally {
      await qr.release();
    }

    return true;
  }

  async deleteMemo(
    memoId: number,
    ): Promise<boolean> {
    await this.memoRepository.delete(memoId);
    return true;
  }
}