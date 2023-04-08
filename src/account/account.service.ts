import { Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/repository/account.repository';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(private accountService: AccountRepository) {}
  async create(createAccountDto: CreateAccountDto) {
    return await this.accountService.create(createAccountDto);
  }

  findOne(id: string) {
    return this.accountService.findOne({ id });
  }

  findAll() {
    return this.accountService.find();
  }

  update(id: string, updateAccountDto: UpdateAccountDto) {
    return this.accountService.findOneAndUpdate({ id }, updateAccountDto);
  }

  remove(id: string) {
    return this.accountService.deleteOne({ id });
  }
}
