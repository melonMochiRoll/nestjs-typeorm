import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth';
import { User } from 'src/entities';
import { UserController } from './user.controller';
import { UserQueryRepository } from './user.query.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      User,
      UserQueryRepository,
    ])
  ],
  controllers: [ UserController ],
  providers: [ UserService ],
})
export class UserModule {}