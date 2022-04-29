import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

  @ManyToOne(() => Memo, (memo) => memo.comments)
  memo: Memo;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}