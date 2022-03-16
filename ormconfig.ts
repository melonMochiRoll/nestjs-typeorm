import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import dotenv from 'dotenv';
import { User } from "src/entities/user.entity";

dotenv.config();
export const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.ADMINID,
  password: process.env.ADMINPASSWORD,
  database: process.env.ADMINDATABASE,
  entities: [
    User,
  ],
  autoLoadEntities: true,
  charset: 'utf8mb4',
  keepConnectionAlive: true,
  synchronize: false,
}