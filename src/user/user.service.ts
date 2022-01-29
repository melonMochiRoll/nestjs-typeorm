import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { SALT_OR_ROUNDS } from 'src/common/constants';
import { ApiHttpResponse } from 'src/common/enums';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User> ) {}
  
  async createUser(
    email: string,
    nickname: string,
    password: string
  ) {
    const user = await this.UserRepository.findOne({ email });
    if (user) {
      throw new HttpException(ApiHttpResponse.EXIST_EMAIL, 401);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_OR_ROUNDS);
    await this.UserRepository.save({
      email,
      nickname,
      password: hashedPassword });

    return true;
  }
}
