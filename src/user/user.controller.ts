import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
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
    private authService: AuthService,
    ) {}

  @Get('email')
  verifyEmail(@Query('email') email: string) {
    return this.userService.verifyEmail(email);
  }

  @Get('nickname')
  verifyNickname(@Query('nickname') nickname: string) {
    return this.userService.verifyNickname(nickname);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('jwt')
  getJwt(@UserDecorator() user: User): User | false {
    return user || false;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async jwtLogIn(@UserDecorator() user: User, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.signJwt(user);
    res.cookie('Authorization', token.access_token);
    return token;
  }

  @Get('logout')
  logOut(@Req() req: Request, @Res() res: Response): void {
    req.logout();
    res.redirect('/');
  }
}
