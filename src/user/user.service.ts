import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { SALT_OR_ROUNDS } from 'src/common/constants';
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
    ): Promise<boolean> {
    const user = await this.userRepository.count({ email });

    if (user) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }
    
    return true;
  }

  async checkByNickname(
    nickname: string,
    ): Promise<boolean> {
    const user = await this.userRepository.count({ nickname });

    if (user) {
      throw new ConflictException('이미 존재하는 닉네임입니다.');
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

    throw new NotFoundException('존재하지 않는 이메일입니다.');
  }

  async findByNickname(
    nickname: string
    ): Promise<User> {
    const user = await this.userRepository.findOne({ nickname });

    if (user) {
      return user;
    }

    throw new NotFoundException('존재하지 않는 닉네임입니다.');
  }
  
  async createUser(
    createUserDto: CreateUserDto,
    ): Promise<boolean> {
    const { email, nickname, password } = createUserDto;
    const trimmedEmail = email.trim();
    const trimmedNickname = nickname.trim();
    
    await this.checkByEmail(trimmedEmail);
    await this.checkByNickname(trimmedNickname);

    const hashedPassword = await bcrypt.hash(password, SALT_OR_ROUNDS);
    try {
      await this.userRepository.save({
        email: trimmedEmail,
        nickname: trimmedNickname,
        password: hashedPassword
      });
    } catch(e) {
      console.error(e);
      throw new ConflictException();
    }

    return true;
  }
}