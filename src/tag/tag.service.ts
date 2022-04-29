import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/entities';
import { Like, Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async getTag(keyword: string): Promise<Tag[] | boolean> {
    const tag = await this.tagRepository.find({
      tag: Like(`%${keyword}%`),
    });
    if (tag.length) {
      return tag;
    }
    return false;
  }

  async createTag(keyword: string): Promise<boolean> {
    const check = await this.getTag(keyword);

    if (check) {
      return false;
    }

    const tag = await this.tagRepository.save({
      tag: keyword,
    });
    return true;
  }
}
