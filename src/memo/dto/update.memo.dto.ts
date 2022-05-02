import { Column } from "typeorm";

export class UpdateMemoDto {
  @Column('int')
  memoId: number;

  @Column('varchar', { length: 45 })
  title: string;

  @Column('varchar', { length: 1000 })
  contents: string;

  @Column('boolean')
  publicMode: boolean;

  @Column('text', { nullable: true })
  tags: string;
};