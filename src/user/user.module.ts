import { Module } from '@nestjs/common';
import { UserController, UserService } from '.';

@Module({
  providers: [ UserService ],
  controllers: [ UserController ]
})
export class UserModule {}