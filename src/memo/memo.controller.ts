import { Body, Controller, Get, ParseIntPipe, Post, Query, } from '@nestjs/common';
import { Memo } from 'src/entities';
import { CreateMemoDto } from './dto';
import { MemoService } from './memo.service';

@Controller('api/memo')
export class MemoController {
  constructor(
    private memoService: MemoService
  ) {}

  @Get()
  async getMemos(
    @Query('id', ParseIntPipe) userId: number,
    ): Promise<Memo[]> {
    return await this.memoService.getMemos(userId);
  }

  @Post()
  async createMemo(
    @Body() createMemoDto: CreateMemoDto,
  ): Promise<boolean> {
    return await this.memoService.createMemo(createMemoDto);
  }
}
