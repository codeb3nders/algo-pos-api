import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/shared';
import { Item } from './schemas/item.schema';

@Injectable()
export class ItemsRepository extends AbstractRepository<Item> {
  protected readonly logger = new Logger(ItemsRepository.name);

  constructor(
    @InjectModel(Item.name) userModel: Model<Item>,
    @InjectConnection() connection: Connection,
  ) {
    super(userModel, connection);
  }
}
