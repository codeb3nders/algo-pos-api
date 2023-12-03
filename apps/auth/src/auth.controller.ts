import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './sub/guards';

@Controller()
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @UseGuards(JwtGuard)
  @Get()
  privateEndpoint(@Req() req): string {
    console.log(req.cookies);
    return this.AuthService.getHello();
  }

  @Get('/public')
  publicEndpoint(@Req() req): string {
    console.log(req.cookies);
    return this.AuthService.getHello();
  }
}
