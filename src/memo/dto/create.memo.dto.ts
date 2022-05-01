import { Column } from "typeorm";

export class CreateMemoDto {
  @Column('varchar', { length: 45, nullable: true })
  title: string;

  @Column('varchar', { length: 16 })
  author: string;

  @Column('varchar', { length: 1000 })
  contents: string;

  @Column('boolean', { default: true })
  publicMode: boolean;

  @Column('int')
  folderName: string;

  @Column('tags')
  tags: string[];
};