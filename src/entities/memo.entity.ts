import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MemoFolder } from "./memoFolder.entity";
import { MemoTag } from "./memoTag.entity";
import { Tag } from "./tag.entity";

@Entity({ schema: 'melonmochi', name: 'memo' })
export class Memo {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('varchar', { length: 45, nullable: true })
  title: string;

  @Column('text')
  contents: string;

  @Column('boolean')
  public: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => MemoFolder, (memoFolder) => memoFolder.memos, {
    onDelete: 'CASCADE',
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