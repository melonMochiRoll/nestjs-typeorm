import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/entities';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
    TypeOrmModule.forFeature([ User ]),
    PassportModule.register({ session: true }) ],
  providers: [
    AuthService,
    LocalStrategy ],
  exports: [
    AuthService ]
})
export class AuthModule {}