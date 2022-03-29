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

  async findByEmail(email: string): Promise<User> {
    const user = await this.UserRepository.findOne({ email });
    if(!user) {
      throw new NotFoundException(UserHttpResponseMessage.EXIST_EMAIL);
    }
    return user;
  }

  async findByNickname(nickname: any): Promise<User> {
    const user = await this.UserRepository.findOne({ nickname });
    if(!user) {
      throw new NotFoundException(UserHttpResponseMessage.EXIST_NICKNAME);
    }
    return user;
  }
  
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, nickname, password } = createUserDto;
    
    const user = await this.findByEmail(email);
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
