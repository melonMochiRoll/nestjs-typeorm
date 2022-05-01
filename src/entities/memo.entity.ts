import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { MemoTag } from "./memoTag.entity";
import { Tag } from "./tag.entity";
import { User } from "./user.entity";

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
  
  @Column('varchar', { length: 33, default: '메모' })
  folderName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('int', { name: 'userId' })
  userId: number;

  @ManyToOne(() => User, (user) => user.memos)
  @JoinColumn([{
    name: 'userId', referencedColumnName: 'id',
  }])
  user: User;

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