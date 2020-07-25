import {
  Controller,
  Headers,
  Post,
  UseGuards,
  Body,
  HttpException,
  HttpStatus,
  Res,
  Req,
  Delete, Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { Auth } from './auth.entity';
import { CurrentUser } from '../core/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() user: User): Promise<{message: string}> {
    const { email, password } = user;

    if (!email) {
      throw new HttpException('Username is required', HttpStatus.BAD_REQUEST);
    }

    if (!password) {
      throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
    }

    let exist;
    try {
      exist = await this.userService.findUserByEmail(email);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (exist) {
      throw new HttpException(`${email} exists`, HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userService.register(user);
    return {
      message: 'user create seccess!',
    };
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body()  user: User, @Res() res: Response, @Req() req: Request) {
    const { id } = req.user as any;
    const token = await this.authService.login(user, id);
    return res.status(HttpStatus.OK).json(token);
  }

  @Post('token')
  async refreshToken(@Headers() headers, @Body()  auth: Auth) {
    const refresh = {
      refreshToken: headers['refresh-token'],
      deviceId: auth.deviceId,
      userId: auth.userId,
    };
    return this.authService.refreshToken(refresh);
  }

  @Delete('logout')
  async logout(@Headers() headers) {
    return this.authService.logout(headers['refresh-token']);
  }

  @Delete('logout-all')
  async logoutAll(@Body() userId) {
    return this.authService.logoutAll(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('sessions')
  async getAllSession(@CurrentUser() user) {
    return this.authService.getAllSession(user.id);
  }
}
