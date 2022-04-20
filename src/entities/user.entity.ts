import { IsEmail, IsNotEmpty } from "class-validator";
import { UserRoleEnum } from "src/common/enums";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Memo } from "./memo.entity";

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

  @Column({
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
    type: 'enum'
  })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Memo, (memo) => memo.user)
  memos: Memo[];
}