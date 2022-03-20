import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { SALT_OR_ROUNDS } from 'src/common/constants';
import { ApiHttpResponse } from 'src/common/enums';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User> ) {}

  async verifyEmail(email: string) {
    const user = await this.UserRepository.findOne({ email }, {
      select: ['email'],
    });
    const result = user ? true : false;
    return result;
  }

  async verifyNickname(nickname: any) {
    const user = await this.UserRepository.findOne({ nickname }, {
      select: ['nickname'],
    });
    const result = user ? true : false;
    return result;
  }
  
  async createUser(createUserDto: CreateUserDto) {
    const { email, nickname, password } = createUserDto;
    
    const user = await this.UserRepository.findOne({ email });
    if (user) {
      throw new HttpException(ApiHttpResponse.EXIST_EMAIL, 400);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_OR_ROUNDS);
    await this.UserRepository.save({
      email,
      nickname,
      password: hashedPassword });

    return true;
  }
}
