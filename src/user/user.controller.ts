import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from 'src/auth';
import { UserDecorator } from 'src/common/decorators';
import { JwtAuthGuard, LocalAuthGuard } from 'src/common/guards'
import { User } from 'src/entities';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService ) {}

  @Get()
  getUser(@UserDecorator() user: User): User | false {
    return user || false;
  }

  @UseGuards(JwtAuthGuard)
  @Get('jwt')
  getJwt(@UserDecorator() user: User): User | false {
    return user || false;
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body.email, body.nickname, body.password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  logIn(@UserDecorator() user: User): User | false {
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('jwt/login')
  jwtLogIn(@UserDecorator() user: User): { access_token: string } {
    return this.authService.signJwt(user);
  }

  @Get('logout')
  logOut(@Req() req: Request, @Res() res: Response): void {
    req.logout();
    res.redirect('/');
  }
}
