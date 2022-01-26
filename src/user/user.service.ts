import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { ApiHttpResponse, SALT_OR_ROUNDS } from 'src/common';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>
  ) {}
  
  async createUser(
    email: string,
    nickname: string,
    password: string
  ) {
    const user = await this.UserRepository.findOne({ email });
    if (user) {
      throw new HttpException(ApiHttpResponse, 401);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_OR_ROUNDS);
    await this.UserRepository.save({
      email,
      nickname,
      password: hashedPassword });

    return true;
  }
}
