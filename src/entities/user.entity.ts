import { IsEmail, IsNotEmpty } from "class-validator";
import { UserRole } from "src/common/enums";
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
  @Column('varchar', { name: 'name', length: 30 })
  name: string;

  @IsNotEmpty()
  @Column('varchar', { name: 'password', length: 100, select: false })
  password: string;

  @Column({
    enum: UserRole,
    default: UserRole.USER,
    type: 'enum'
  })
  role: string;
}