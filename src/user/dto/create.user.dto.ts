import { Column } from "typeorm";

export class CreateUserDto {
  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar', { length: 16 })
  nickname: string;

  @Column('text', { select: false })
  password: string;
};