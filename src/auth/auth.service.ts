import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { JwtPayload } from 'src/common/interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email },
      { select: [ 'id', 'email', 'nickname', 'password'] });

    if (!user) {
      return null;
    }

    const compare = bcrypt.compare(password, user.password);
    if (compare) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  signJwt(user: User): { access_token: string } {
    const payload: JwtPayload = { sub: `${user.id}`, username: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}