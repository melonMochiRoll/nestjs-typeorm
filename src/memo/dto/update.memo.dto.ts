import { Column } from "typeorm";

export class UpdateMemoDto {
  @Column('int')
  memoId: number;
  
  @Column('varchar', { length: 1000 })
  contents: string;

  @Column('boolean')
  publicMode: boolean;

  @Column('varchar', { length: 33 })
  folderName: string;

  @Column('text')
  tags: string;
};