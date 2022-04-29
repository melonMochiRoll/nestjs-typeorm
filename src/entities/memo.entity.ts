import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { MemoTag } from "./memoTag.entity";
import { Tag } from "./tag.entity";

@Entity({ schema: 'melonmochi', name: 'memo' })
export class Memo {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('varchar', { length: 16 })
  author: string;

  @Column('varchar', { length: 45, nullable: true })
  title: string;

  @Column('varchar', { length: 1000 })
  contents: string;

  @Column('boolean', { default: true })
  publicMode: boolean;
  
  @Column('varchar', { length: 33 })
  folderName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => MemoTag, (memoTag) => memoTag.memo)
  memoTag: MemoTag[];

  @ManyToMany(() => Tag, (tag) => tag.memos)
  @JoinTable({
    name: 'memotag',
    joinColumn: {
      name: 'memoId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tagId',
      referencedColumnName: 'id',
    },
  })
  tags: Tag[];

  @OneToMany(() => Comment, (comment) => comment.memo)
  comments: Comment[];
}