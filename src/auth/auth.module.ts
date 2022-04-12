import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { LocalStrategy } from './strategies';
import { AuthService } from './auth.service';
import { LocalSerializer } from './auth.local.serializer';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User ]),
    PassportModule.register({ session: true }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    LocalSerializer,
  ],
  exports: [
    AuthService,
  ],
})
export class AuthModule {}