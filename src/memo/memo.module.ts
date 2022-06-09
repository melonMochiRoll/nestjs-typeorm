import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memo, MemoTag } from 'src/entities';
import { TagModule } from 'src/tag';
import { MemoController } from './memo.controller';
import { MemoQueryRepository } from './memo.query.repository';
import { MemoService } from './memo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Memo,
      MemoTag,
    ]),
    TagModule,
  ],
  controllers: [ MemoController ],
  providers: [
    MemoService,
    MemoQueryRepository,
  ],
})
export class MemoModule {}
