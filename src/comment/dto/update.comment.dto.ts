import { Column } from "typeorm";

export class UpdateCommentDto {
  @Column('int')
  memoId: number;

  @Column('varchar', { length: 330 })
  text: string;
};