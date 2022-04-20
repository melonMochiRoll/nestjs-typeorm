import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MemoFolder } from "./memoFolder.entity";
import { MemoTag } from "./memoTag.entity";
import { Tag } from "./tag.entity";
import { User } from "./user.entity";

@Entity({ schema: 'melonmochi', name: 'memo' })
export class Memo {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('text')
  contents: string;

  @Column('boolean')
  public: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.memos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{
    name: 'userId', referencedColumnName: 'id',
  }])
  user: User;

  @ManyToOne(() => MemoFolder, (memoFolder) => memoFolder.memos, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{
    name: 'memoFolderId', referencedColumnName: 'id',
  }])
  memoFolder: MemoFolder;

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
}