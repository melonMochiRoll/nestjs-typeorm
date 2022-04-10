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
    ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email },
      { select: [ 'id', 'email', 'nickname', 'password', 'role'] });

    if (!user) {
      return null;
    }

    const compare = await bcrypt.compare(password, user.password);
    if (compare) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}