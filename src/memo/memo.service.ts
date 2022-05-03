import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Memo, MemoTag } from 'src/entities';
import { TagService } from 'src/tag';
import { UserService } from 'src/user';
import { Repository } from 'typeorm';
import { CreateMemoDto, UpdateMemoDto } from './dto';

@Injectable()
export class MemoService {
  constructor(
    @InjectRepository(Memo)
    private memoRepository: Repository<Memo>,
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
    const { tags, ...withoutTags } = createMemoDto;

    await this.userService.findByNickname(withoutTags.author);

    const createdMemo = await this.memoRepository.save(withoutTags);
    await this.updateTags(createdMemo.id, tags);
    
    return true;
  }

  async updateMemo(
    updateMemoDto: UpdateMemoDto,
  ): Promise<boolean> {
    const { memoId, tags, ...updatePropery } = updateMemoDto;

    await this.memoRepository.update(memoId, updatePropery);
    await this.updateTags(memoId, tags);

    return true;
  }

  async deleteMemo(
    memoId: number,
  ) {
    await this.memoRepository.delete(memoId);
    return true;
  }

  async updateTags(
    memoId: number,
    tags: string,
  ): Promise<void> {
    tags.split(';').map(async (tag: string) => {
      const createdTag = await this.tagService.createTag(tag);

      await this.memoTagRepository.save({
        memoId: memoId,
        tagId: createdTag.id,
      });
    });
  }
}