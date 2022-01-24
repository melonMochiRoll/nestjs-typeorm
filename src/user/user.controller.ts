import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDecorator } from 'src/common/decorators';
import { User } from 'src/entities';
import { UserService } from '.';
import { CreateUserDto } from './dto/create.user.dto';

@Controller('api/user')
export class UserController {
  constructor(
    private userService: UserService ) {}

  @Get()
  getUser(@UserDecorator() user: User) {
    return user || false;
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body.email, body.nickname, body.password);
  }

  @Post('login')
  logIn() {
    
  }

  @Post('logout')
  logOut() {

  }
}
