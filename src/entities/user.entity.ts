import { IsEmail, IsNotEmpty } from "class-validator";
import { UserRoleEnum } from "src/common/enums";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsEmail()
  @IsNotEmpty()
  @Column('varchar', { name: 'email', unique: true, })
  email: string;

  @IsNotEmpty()
  @Column('varchar', { name: 'nickname', length: 30 })
  nickname: string;

  @IsNotEmpty()
  @Column('varchar', { name: 'password', length: 100, select: false })
  password: string;

  @Column({
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
    type: 'enum'
  })
  role: string;
}