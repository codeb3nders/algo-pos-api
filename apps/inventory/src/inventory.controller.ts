import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { InventoryService } from './inventory.service';

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @EventPattern('order_created')
  async getGreetingMessageAysnc(name: string): Promise<string> {
    console.log('======================= TRIGGERED');
    return `Hey, Hello ${name}`;
  }

  @EventPattern('validate_user')
  async accumulate(data: number = 10): Promise<number> {
    console.log('MESSAGE RECIPIENT');
    return data + 10;
  }
}
