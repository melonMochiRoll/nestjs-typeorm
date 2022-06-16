import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { MemoWithHasMore } from 'src/common/interfaces';
import { Tag } from 'src/entities';
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
    @Query('cs', ParseIntPipe) currentSequence,
  ): Promise<MemoWithHasMore> {
    return await this.tagService.getMemosByTag(tag, currentSequence);
  }
}
