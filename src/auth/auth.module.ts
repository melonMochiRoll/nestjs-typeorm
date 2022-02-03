import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/entities';
import { LocalStrategy, JwtStrategy } from './strategies';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 900 },
    }),
    TypeOrmModule.forFeature([ User ]),
    PassportModule.register({ session: true }) ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy ],
  exports: [
    AuthService ]
})
export class AuthModule {}