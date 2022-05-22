import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memo, MemoTag, Tag, User } from 'src/entities';
import { TagService } from 'src/tag';
import { UserService } from 'src/user';
import { MemoController } from './memo.controller';
import { MemoQueryRepository } from './memo.query.repository';
import { MemoService } from './memo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Memo,
      MemoTag,
      Tag,
    ]),
  ],
  controllers: [ MemoController ],
  providers: [
    MemoService,
    UserService,
    TagService,
    MemoQueryRepository,
  ]
})
export class MemoModule {}
