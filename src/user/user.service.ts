import { ForbiddenException, HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { SALT_OR_ROUNDS } from 'src/common/constants';
import { UserHttpResponseMessageEnum } from 'src/common/enums';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { UserQueryRepository } from './user.query.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userQueryRepository: UserQueryRepository,
    ) {}

  async findByType(value: string): Promise<User> {
    return await this.userQueryRepository.findUser(value);
  }
  
  async createUser({
    email,
    nickname,
    password
    }: CreateUserDto): Promise<User> {
    
    const user = await this.userRepository.findOne({
      where: [
        { email },
        { nickname },
      ]
    });
    if (user) {
      throw new HttpException(UserHttpResponseMessageEnum.INVALID_JOIN, 401);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_OR_ROUNDS);
    const savedUser = await this.userRepository.save({
      email,
      nickname,
      password: hashedPassword });

    return savedUser;
  }
}
