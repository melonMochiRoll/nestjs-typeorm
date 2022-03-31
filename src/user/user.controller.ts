import { Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
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

  @Get()
  findByType(
    @Query('type') type: string,
    @Query('value') value: string,
    ): Promise<User> {
    return this.userService.findByType(type, value);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get('jwt')
  @UseGuards(JwtAuthGuard)
  getJwt(@UserDecorator() user: User): User | false {
    return user || false;
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
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
