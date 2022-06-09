import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Memo, Tag } from 'src/entities';
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

    if (tag?.length) {
      return tag;
    }
    
    return [];
  }

  async getMemosByTag(
    tag: string,
  ): Promise<any> {
    const tagWithMemos = await this.tagQueryRepository.getMemosByTag(tag);

    if (tagWithMemos?.length) {
      const memos = tagWithMemos.map((ele: any) => ele.memos);
      console.log(memos);
      return memos;
    }
  
    return [];
  }

  async deleteTag(
    keyword: string,
  ): Promise<boolean> {
    await this.tagRepository.delete({ tag: keyword });
    return true;
  }
}
