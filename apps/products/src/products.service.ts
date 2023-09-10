import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductRequest } from './dto/create-product.request';
import { UpdateProductRequest } from './dto/update-product.request';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getProductById(id: string) {
    return this.productsRepository.findOne({ _id: id });
  }

  getProducts() {
    return this.productsRepository.find({});
  }

  async createProduct(request: CreateProductRequest) {
    const session = await this.productsRepository.startTransaction();
    try {
      const order = await this.productsRepository.create(request, { session });
      await session.commitTransaction();
      return order;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  // update product
  async updateProduct(id: string, update: UpdateProductRequest) {
    const session = await this.productsRepository.startTransaction();
    try {
      const result = await this.productsRepository.findOneAndUpdate(
        { _id: id },
        update,
      );
      await session.commitTransaction();
      return result;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  // delete product
}
