import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/entities';
import { Like, Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
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
    const tag = await this.tagRepository.find({
      tag: Like(`%${keyword}%`),
    });

    if (tag?.length) {
      return tag;
    }
    
    return null;
  }

  async deleteTag(
    keyword: string,
  ) {
    await this.tagRepository.delete({ tag: keyword });
    return true;
  }
}
