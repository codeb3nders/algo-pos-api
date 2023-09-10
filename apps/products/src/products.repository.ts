import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/shared';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsRepository extends AbstractRepository<Product> {
  protected readonly logger = new Logger(ProductsRepository.name);

  constructor(
    @InjectModel(Product.name) orderModel: Model<Product>,
    @InjectConnection() connection: Connection,
  ) {
    super(orderModel, connection);
  }
}
