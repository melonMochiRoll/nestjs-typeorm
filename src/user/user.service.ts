import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { SALT_OR_ROUNDS } from 'src/common/constants';
import { UserHttpResponseMessage } from 'src/common/enums';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User> ) {}

  async findByEmail(
    email: string
    ): Promise<User> {
    const user = await this.UserRepository.findOne({ email });
    if(!user) {
      throw new NotFoundException(UserHttpResponseMessage.NOTEXIST_EMAIL);
    }
    return user;
  }

  async findByNickname(
    nickname: string
    ): Promise<User> {
    const user = await this.UserRepository.findOne({ nickname });
    if(!user) {
      throw new NotFoundException(UserHttpResponseMessage.NOTEXIST_NICKNAME);
    }
    return user;
  }
  
  async createUser({
    email,
    nickname,
    password
    }: CreateUserDto): Promise<User> {
    
    const user = await this.UserRepository.findOne({ email });
    if (user) {
      throw new HttpException(UserHttpResponseMessage.EXIST_EMAIL, 401);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_OR_ROUNDS);
    const savedUser = await this.UserRepository.save({
      email,
      nickname,
      password: hashedPassword });

    return savedUser;
  }
}
