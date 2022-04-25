import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Memo } from "./memo.entity";
import { User } from "./user.entity";

@Entity({ schema: 'melonmochi', name: 'memofolder' })
export class MemoFolder {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('varchar', { length: 30 })
  folderName: string;

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

  @OneToMany(() => Memo, (memo) => memo.memoFolder)
  memos: Memo[];
}