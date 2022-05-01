import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Memo, MemoTag } from 'src/entities';
import { TagService } from 'src/tag';
import { UserService } from 'src/user';
import { Repository } from 'typeorm';
import { CreateMemoDto } from './dto';

@Injectable()
export class MemoService {
  constructor(
    @InjectRepository(Memo)
    private memoRepository: Repository<Memo>,
    @InjectRepository(MemoTag)
    private memoTagRepository: Repository<MemoTag>,
    private userService: UserService,
    private tagService: TagService,
  ) {}

  async getMemos(
    userId: number
    ): Promise<Memo[]> {
    const memos = await this.memoRepository.find({ userId });

    if(!memos.length) {
      throw new NotFoundException('유저 정보를 찾지 못했습니다.');
    }

    return memos;
  }

  async createMemo(
    createMemoDto: CreateMemoDto,
    ): Promise<boolean> {
    const { title, author, contents, publicMode, folderName, tags } = createMemoDto;

    await this.userService.findByNickname(author);

    const memo = await this.memoRepository.save({
      title,
      author,
      contents,
      publicMode,
      folderName,
    });

    tags.map(async (tag: string) => {
      const result = await this.tagService.createTag(tag);
      await this.memoTagRepository.save({
        memoId: memo.id,
        tagId: result.id,
      });
    });
    
    return true;
  }
}