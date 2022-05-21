import { Column } from "typeorm";

export class CreateMemoDto {

  @Column('varchar', { length: 16 })
  author: string;

  @Column('varchar', { length: 1000 })
  contents: string;

  @Column('boolean', { default: true })
  publicMode: boolean;

  @Column('varchar', { length: 33 })
  folderName: string;

  @Column('int')
  userId: number;

  @Column('text')
  tags: string;
};