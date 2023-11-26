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
      const item = await this.itemsRepository.create(request, { session });

      console.log({ item });

      return item;
    } catch (err) {
      console.log({ err });
      await session.abortTransaction();
      throw err;
    }
  }

  async get() {
    const res = await this.itemsRepository.find({});
    console.log({ res });
    return res;
  }
}
