import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Memo } from "./memo.entity";
import { MemoTag } from "./memoTag.entity";

@Entity({ schema: 'melonmochi', name: 'tag' })
export class Tag {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  tag: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => MemoTag, (memoTag) => memoTag.memo)
  memoTag: MemoTag[];

  @ManyToMany(() => Memo, (memo) => memo.tags)
  memos: Memo[];
}