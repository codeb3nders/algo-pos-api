import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './users/schemas/user.schema';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('check')
  async check(@Body() request) {
    return 'CHEK';
  }

  // @Get('logout')
  // async logout(@Res({ passthrough: true }) response: Response) {
  //   this.authService.logout(response);
  //   response.send();
  // }

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(
  //   @CurrentUser() user: User,
  //   @Res({ passthrough: true }) response: Response,
  // ) {
  //   await this.authService.login(user, response);
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   console.log({ user });
  //   const { password, ...rest } = user;
  //   response.send(rest);
  // }

  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    this.authService.logout(response);
    response.send();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token } = await this.authService.login(user);

    const { password, ...userData } = user;

    response.send({
      statusCode: 200,
      user: { ...userData, access_token },
    });
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user: User) {
    return user;
  }
}
