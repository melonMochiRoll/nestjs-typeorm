import { IsEmail, IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { Memo } from "./memo.entity";

@Entity({ schema: 'melonmochi', name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @IsEmail()
  @IsNotEmpty()
  @Column('varchar', { unique: true })
  email: string;

  @IsNotEmpty()
  @Column('varchar', { length: 16 })
  nickname: string;

  @IsNotEmpty()
  @Column('text', { select: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Memo, (memo) => memo.user)
  memos: Memo[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}