import { Body, Controller, Get, Post, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import type { Request, Response } from 'express';
import { UserDecorator } from 'src/common';
import { LocalAuthGuard } from 'src/common/guards'
import { User } from 'src/entities';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(
    private userService: UserService,
    ) {}

  @Get()
  getUser(
    @UserDecorator() user: User,
    ): User | null {
    return user || null;
  }

  @Get('checkEmail')
  checkByEmail(
    @Query('email') email: string,
    ): Promise<boolean> {
    return this.userService.checkByEmail(email);
  }

  @Get('checkNickname')
  checkByNickname(
    @Query('nickname') nickname: string,
    ): Promise<boolean> {
    return this.userService.checkByNickname(nickname);
  }

  @Get('email')
  findByEmail(
    @Query('email') email: string,
    ): Promise<User> {
    return this.userService.findByEmail(email);
  }

  @Get('nickname')
  findByNickname(
    @Query('nickname') nickname: string,
    ): Promise<User> {
    return this.userService.findByNickname(nickname);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(
    @Body() createUserDto: CreateUserDto,
    ): Promise<boolean> {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  logIn(
    @UserDecorator() user: User,
    ) {
    return user;
  }

  @Get('logout')
  logOut(
    @Req() req: Request,
    @Res() res: Response,
    ) {
    res.clearCookie('connect.sid', { httpOnly: true });
    req.session.destroy(() => {
      res.send('ok');
    });
  }
}
