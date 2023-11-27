import { Injectable } from '@nestjs/common';
import { InventoryRepository } from './Inventory.repository';
import { CreateInventoryRequest } from './dto/create-inventory.request';
import { UpdateInventoryRequest } from './dto/update-inventory.request';

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

  async updateInventory(code: string) {
    const session = await this.inventoryRepository.startTransaction();
    try {
      const result = await this.inventoryRepository.findOneAndUpdate(
        { iCode: code },
        { $inc: { beginning: -1 } }, // Using $inc to decrement the beginning field by 1
      );
      await session.commitTransaction();
      return result;
    } catch (err) {
      await session.abortTransaction();
      // do not throw error here.
    }
  }

  async getInventory() {
    return this.inventoryRepository.find({});
  }
}
