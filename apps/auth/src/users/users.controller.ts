import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';

@Controller('auth/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  async createUser(@Body() request: CreateUserRequest) {
    console.log('CREATE USER', request);
    return this.usersService.createUser(request);
  }
}
