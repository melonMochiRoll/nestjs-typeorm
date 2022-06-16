import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemoWithHasMore } from 'src/common/interfaces';
import { Tag } from 'src/entities';
import { Like, Repository } from 'typeorm';
import { TagQueryRepository } from './tag.query.repository';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    private tagQueryRepository: TagQueryRepository,
  ) {}

  async getTag(
    keyword: string,
    ): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      tag: keyword,
    });

    if (tag) {
      return tag;
    }

    return null;
  }

  async getTags(
    keyword: string,
    ): Promise<Tag[]> {
    if (!keyword) {
      return [];
    }
    
    const tag = await this.tagRepository.find({
      tag: Like(`%${keyword}%`),
    });
    
    return tag;
  }

  async getMemosByTag(
    tag: string,
    currentSequence: number,
  ): Promise<MemoWithHasMore> {
    const { id } = await this.getTag(tag);
    const tagWithMemos = await this.tagQueryRepository.getMemosByTag(id, currentSequence);
    const { count } = await this.tagQueryRepository.getMemoCountByTag(id);

    const memos = tagWithMemos.map((ele: any) => ele.memo);
    const hasMore = count > currentSequence || false;

    if (!tagWithMemos?.length) {
      return { memos: [], hasMore };
    }
  
    return { memos, hasMore };
  }

  async deleteTag(
    keyword: string,
  ): Promise<boolean> {
    await this.tagRepository.delete({ tag: keyword });
    return true;
  }
}
