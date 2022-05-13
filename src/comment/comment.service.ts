import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateCommentDto, UpdateCommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
  ): Promise<boolean> {
    try {
      await this.commentRepository.save(createCommentDto);
    } catch(e) {
      console.error(e);
      throw new ConflictException();
    }

    return true;
  }

  async updateComment(
    updateCommentDto: UpdateCommentDto,
  ): Promise<boolean> {
    const { memoId, text } = updateCommentDto;
    try {
      await this.commentRepository.update(memoId, { text });
    } catch(e) {
      console.error(e);
      throw new ConflictException();
    }

    return true;
  }

  async deleteComment(
    commentId: number,
    ): Promise<boolean> {
    try {
      await this.commentRepository.delete({ id: commentId });
    } catch(e) {
      console.error(e);
    }
    
    return true;
  }
}
