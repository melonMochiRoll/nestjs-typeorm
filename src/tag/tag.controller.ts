import { Controller, Get, Query } from '@nestjs/common';
import { Memo, Tag } from 'src/entities';
import { TagService } from './tag.service';

@Controller('api/tag')
export class TagController {
  constructor(
    private tagService: TagService,
  ) {}

  @Get()
  async getTags(
    @Query('keyword') keyword,
  ): Promise<Tag[]> {
    return await this.tagService.getTags(keyword);
  }

  @Get('memo')
  async getMemosByTag(
    @Query('tag') tag,
  ): Promise<Memo[]> {
    return await this.tagService.getMemosByTag(tag);
  }
}
