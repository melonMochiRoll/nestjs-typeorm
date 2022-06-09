import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/entities';
import { TagController } from './tag.controller';
import { TagQueryRepository } from './tag.query.repository';
import { TagService } from './tag.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tag,
    ]),
  ],
  controllers: [ TagController ],
  providers: [
    TagService,
    TagQueryRepository,
  ],
  exports: [ TagService ],
})
export class TagModule {}
