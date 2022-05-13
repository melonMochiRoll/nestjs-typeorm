import { Body, Controller, Delete, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';

@Controller('api/comment')
export class CommentController {
  constructor(
    private commentService: CommentService,
  ) {}

  @Post()
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<boolean> {
    return this.commentService.createComment(createCommentDto);
  }

  @Put()
  async updateComment(
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<boolean> {
    return this.commentService.updateComment(updateCommentDto);
  }

  @Delete()
  async deleteComment(
    @Query('id', ParseIntPipe) commentId: number,
  ): Promise<boolean> {
    return this.commentService.deleteComment(commentId);
  }
}