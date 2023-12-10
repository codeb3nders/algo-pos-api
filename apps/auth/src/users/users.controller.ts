import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { User } from './schemas/user.schema';

@Controller('auth/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  // @UseGuards(JwtGuard)
  async getUsers(@Req() req): Promise<User[]>  {
    return this.usersService.getAllUsers();
  }

 // get user by id
 @Get('/:id')
//  @UseGuards(JwtAuthGuard)
 async getUserById(@Req() req): Promise<User> {
   const resonse = await this.usersService.getUser({_id: req.params.id});   
   const {password, ...rest} = resonse;
   return rest
 }

  @Post()
  async createUser(@Body() request: CreateUserRequest): Promise<User> {
    return this.usersService.createUser(request);
  }
}
