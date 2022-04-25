import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email },
      { select: [ 'id', 'email', 'nickname', 'password' ] });

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