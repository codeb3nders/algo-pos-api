import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AccountDocument, Account } from './entities/account.entity';

import { AbstractRepository } from '@app/shared';

@Injectable()
export class AccountRepository extends AbstractRepository<Account> {
  constructor(
    @InjectModel(Account.name)
    AccountModel: Model<AccountDocument>,
  ) {
    super(AccountModel);
  }
}
