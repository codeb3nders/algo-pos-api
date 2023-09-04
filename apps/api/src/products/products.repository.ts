import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductsDocument, Products } from './entities/product.entity';

import { AbstractRepository } from '@app/shared';

@Injectable()
export class ProductsRepository extends AbstractRepository<Products> {
  constructor(
    @InjectModel(Products.name)
    ProductsModel: Model<ProductsDocument>,
  ) {
    super(ProductsModel);
  }
}
