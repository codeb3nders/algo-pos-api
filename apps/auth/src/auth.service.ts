import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from './users/schemas/user.schema';

export interface TokenPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User) {
    const payload = { name: user.email, sub: user._id.toHexString() };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // this is no use in token based authentication
  logout(response: Response) {
    console.log('LOGOUT');
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }

  // async login(user: User, response: Response) {
  //   const tokenPayload: TokenPayload = {
  //     userId: user._id.toHexString(),
  //   };

  //   const expires = new Date();
  //   expires.setSeconds(
  //     expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
  //   );

  //   response.cookie('user_token', this.jwtService.sign(tokenPayload), {
  //     expires: new Date(Date.now() + 3600000),
  //   });
  //   console.log('SSSSSSUUUUUASDFASFASF');
  //   return 'susscess';
  // }

  // logout(response: Response) {
  //   response.cookie('user_token', '', { expires: new Date(Date.now()) });
  //   return {};
  // }

  getHello(): string {
    return 'Hello World!';
  }
}
