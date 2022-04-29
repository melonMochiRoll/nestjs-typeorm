import { Controller, Get, Post, Query } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('api/tag')
export class TagController {
  constructor(
    private tagService: TagService,
  ) {}

  @Get()
  async getTag(
    @Query('keyword') keyword,
  ) {
    return await this.tagService.getTag(keyword);
  }

  @Post()
  async createTag(
    @Query('keyword') keyword,
  ) {
    return await this.tagService.createTag(keyword);
  }
}
