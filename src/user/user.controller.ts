import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserDecorator } from 'src/common';
import { User } from 'src/entities';
import { UserService, CreateUserDto } from '.';

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

  @UseGuards(AuthGuard('local'))
  @Post('login')
  logIn(@UserDecorator() user: User) {
    return user;
  }

  @Get('logout')
  logOut(@Req() req: Request, @Res() res: Response): void {
    req.logout();
    res.redirect('/');
  }
}
