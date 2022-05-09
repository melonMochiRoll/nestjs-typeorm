import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Memo } from "./memo.entity";
import { User } from "./user.entity";

@Entity({ schema: 'melonmochi', name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('varchar', { length: 16 })
  nickname: string;

  @Column('varchar', { length: 330 })
  text: string;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('int', { name: 'memoId' })
  memoId: number;

  @Column('int', { name: 'userId' })
  userId: number;

  @ManyToOne(() => Memo, (memo) => memo.comments)
  @JoinColumn([{
    name: 'memoId', referencedColumnName: 'id',
  }])
  memo: Memo;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn([{
    name: 'userId', referencedColumnName: 'id',
  }])
  user: User;
}