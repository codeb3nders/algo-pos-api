import { lastValueFrom } from 'rxjs';

import { ItemsRepository } from './items.repository';

import { Injectable } from '@nestjs/common';
import { CreateItemRequest } from './dto/create-item.request';

@Injectable()
export class ItemsService {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  async createItem(request: CreateItemRequest, authentication: string) {
    const session = await this.itemsRepository.startTransaction();
    console.log('CREATE');
    try {
      const order = await this.itemsRepository.create(request, { session });

      await session.commitTransaction();

      return order;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async getItems() {
    return this.itemsRepository.find({});
  }
}
