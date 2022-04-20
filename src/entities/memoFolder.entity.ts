import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Memo } from "./memo.entity";

@Entity({ schema: 'melonmochi', name: 'memofolder' })
export class MemoFolder {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('varchar', { length: 30 })
  folderName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Memo, (memo) => memo.memoFolder)
  memos: Memo[];
}