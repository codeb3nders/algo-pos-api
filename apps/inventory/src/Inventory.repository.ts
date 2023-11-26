import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/shared';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Inventory } from './schemas/inventory.schema';

@Injectable()
export class InventoryRepository extends AbstractRepository<Inventory> {
  protected readonly logger = new Logger(InventoryRepository.name);

  constructor(
    @InjectModel(Inventory.name) orderModel: Model<Inventory>,
    @InjectConnection() connection: Connection,
  ) {
    super(orderModel, connection);
  }
}
