import { Body, Controller, Delete, Get, ParseIntPipe, Post, Put, Query, } from '@nestjs/common';
import { MemoCount } from 'src/common/interfaces';
import { Memo } from 'src/entities';
import { CreateMemoDto, UpdateMemoDto } from './dto';
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

  @Get()
  async getMemosByFolderName(
    @Query('id', ParseIntPipe) userId: number,
    @Query('fn') folderName: string,
  ): Promise<Memo[]> {
    return await this.memoService.getMemosByFolderName(userId, folderName);
  }

  @Get('count')
  async getMemoCount(
    @Query('id', ParseIntPipe) userId: number,
  ): Promise<MemoCount[]> {
    return await this.memoService.getMemoCount(userId);
  }

  @Post()
  async createMemo(
    @Body() createMemoDto: CreateMemoDto,
  ): Promise<boolean> {
    return await this.memoService.createMemo(createMemoDto);
  }

  @Put()
  async updateMemo(
    @Body() updateMemoDto: UpdateMemoDto,
  ): Promise<boolean> {
    return await this.memoService.updateMemo(updateMemoDto);
  }

  @Delete()
  async deleteMemo(
    @Query('id', ParseIntPipe) memoId: number,
  ): Promise<boolean> {
    return await this.memoService.deleteMemo(memoId);
  }
}