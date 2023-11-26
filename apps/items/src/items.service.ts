import { Injectable } from '@nestjs/common';
import { ItemsRepository } from './items.repository';
import { CreateItemRequest } from './dto/create-item.request';

@Injectable()
export class ItemsService {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  getHello(): string {
    return 'Hello items!';
  }

  async createOrder(request: CreateItemRequest) {
    const session = await this.itemsRepository.startTransaction();
    try {
      const order = await this.itemsRepository.create(request, { session });

      return order;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async get() {
    return this.itemsRepository.find({});
  }
}
