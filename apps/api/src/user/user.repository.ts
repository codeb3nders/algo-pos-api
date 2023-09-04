import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDocument, User } from './entities/user.entity';

import { AbstractRepository } from '@app/shared';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  constructor(
    @InjectModel(User.name)
    UserModel: Model<UserDocument>,
  ) {
    super(UserModel);
  }
}
