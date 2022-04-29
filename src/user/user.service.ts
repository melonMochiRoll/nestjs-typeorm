import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
    private userRepository: Repository<User>,
    ) {}

  async checkByEmail(
    email: string,
    ) {
    const user = await this.userRepository.count({ email });
    if (user) {
      throw new ConflictException(UserHttpResponseMessageEnum.EXIST_EMAIL);
    }
    return true;
  }

  async checkByNickname(
    nickname: string,
    ) {
    const user = await this.userRepository.count({ nickname });
    if (user) {
      throw new ConflictException(UserHttpResponseMessageEnum.EXIST_NICKNAME);
    }
    return true;
  }

  async findByEmail(
    email: string
    ): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new NotFoundException(UserHttpResponseMessageEnum.NOTEXIST_EMAIL);
  }

  async findByNickname(
    nickname: string
    ): Promise<User> {
    const user = await this.userRepository.findOne({ nickname });
    if (user) {
      return user;
    }
    throw new NotFoundException(UserHttpResponseMessageEnum.NOTEXIST_NICKNAME);
  }
  
  async createUser(
    createUserDto: CreateUserDto,
    ): Promise<boolean> {
    const { email, nickname, password } = createUserDto;
    
    await this.checkByEmail(email);
    await this.checkByNickname(nickname);

    const hashedPassword = await bcrypt.hash(password, SALT_OR_ROUNDS);
    const savedUser = await this.userRepository.save({
      email,
      nickname,
      password: hashedPassword
    });

    return true;
  }
}
