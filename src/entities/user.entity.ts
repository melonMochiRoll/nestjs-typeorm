import { IsEmail, IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MemoFolder } from "./memoFolder.entity";

@Index('email', ['email'], { unique: true })
@Entity({ schema: 'melonmochi', name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @IsEmail()
  @IsNotEmpty()
  @Column('varchar', { unique: true, })
  email: string;

  @IsNotEmpty()
  @Column('varchar', { length: 16, })
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

  @OneToMany(() => MemoFolder, (memo) => memo.user)
  memos: MemoFolder[];
}