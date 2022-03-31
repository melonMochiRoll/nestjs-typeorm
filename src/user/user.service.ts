import { ForbiddenException, HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { SALT_OR_ROUNDS } from 'src/common/constants';
import { UserHttpResponseMessageEnum } from 'src/common/enums';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User> ) {}

  async findByType(
    type: string,
    value: string
    ): Promise<User> {
    if (type === 'email') {
      const user = await this.UserRepository.findOne({ email: value });
      if(!user) {
        throw new UnauthorizedException(UserHttpResponseMessageEnum.NOTEXIST_EMAIL);
      }
      return user;
    }

    if (type === 'nickname') {
      const user = await this.UserRepository.findOne({ nickname: value });
      if(!user) {
        throw new UnauthorizedException(UserHttpResponseMessageEnum.NOTEXIST_NICKNAME);
      }
      return user;
    } else {
      throw new ForbiddenException('잘못 된 접근 입니다.');
    }
  }
  
  async createUser({
    email,
    nickname,
    password
    }: CreateUserDto): Promise<User> {
    
    const user = await this.UserRepository.findOne({
      where: [
        { email },
        { nickname },
      ]
    });
    if (user) {
      throw new HttpException(UserHttpResponseMessageEnum.EXIST_EMAIL, 401);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_OR_ROUNDS);
    const savedUser = await this.UserRepository.save({
      email,
      nickname,
      password: hashedPassword });

    return savedUser;
  }
}
