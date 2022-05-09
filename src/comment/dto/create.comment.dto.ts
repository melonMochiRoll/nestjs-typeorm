import { Column } from "typeorm";

export class CreateCommentDto {
  @Column('int')
  userId: number;

  @Column('int')
  memoId: number;

  @Column('varchar', { length: 16 })
  nickname: string;

  @Column('varchar', { length: 330 })
  text: string;
};