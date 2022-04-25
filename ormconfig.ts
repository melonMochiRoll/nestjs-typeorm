import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import dotenv from 'dotenv';
import { User, Memo, MemoFolder, Tag, MemoTag } from "src/entities";

dotenv.config();
export const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.ADMIN_ID,
  password: process.env.ADMIN_PASSWORD,
  database: process.env.ADMIN_DATABASE,
  entities: [
    User,
    Memo,
    Tag,
    MemoTag,
    MemoFolder,
  ],
  autoLoadEntities: true,
  charset: 'utf8mb4',
  keepConnectionAlive: true,
  synchronize: false,
}