import { Controller, Get, Query } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('api/tag')
export class TagController {
  constructor(
    private tagService: TagService,
  ) {}

  @Get()
  async getTags(
    @Query('keyword') keyword,
  ) {
    return await this.tagService.getTags(keyword);
  }
}
