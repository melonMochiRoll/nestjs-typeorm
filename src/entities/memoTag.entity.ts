import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { Memo } from "./memo.entity";
import { Tag } from "./tag.entity";

@Entity({ schema: 'melonmochi', name: 'memotag' })
export class MemoTag {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('int', { name: 'memoId', primary: true })
  memoId: number;

  @Column('int', { name: 'tagId', primary: true })
  tagId: number;

  @ManyToOne(() => Memo, (memo) => memo.memoTag, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{
    name: 'memoId', referencedColumnName: 'id',
  }])
  memo: Memo;

  @ManyToOne(() => Tag, (tag) => tag.memoTag, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{
    name: 'tagId', referencedColumnName: 'id',
  }])
  tag: Tag;
}
