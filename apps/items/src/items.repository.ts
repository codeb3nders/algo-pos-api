import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/shared';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Item } from './schemas/item.schema';

@Injectable()
export class ItemsRepository extends AbstractRepository<Item> {
  protected readonly logger = new Logger(ItemsRepository.name);

  constructor(
    @InjectModel(Item.name) orderModel: Model<Item>,
    @InjectConnection() connection: Connection,
  ) {
    super(orderModel, connection);
  }
}
