import { Injectable } from '@nestjs/common';
import { InventoryRepository } from './Inventory.repository';
import { CreateInventoryRequest } from './dto/create-inventory.request';

@Injectable()
export class InventoryService {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async createInventory(request: CreateInventoryRequest) {
    const session = await this.inventoryRepository.startTransaction();

    try {
      const inventory = await this.inventoryRepository.create(request, {
        session,
      });

      await session.commitTransaction();

      return inventory;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async getInventory() {
    return this.inventoryRepository.find({});
  }
}
