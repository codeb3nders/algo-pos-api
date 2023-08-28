import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InventoryService } from './inventory.service';

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @MessagePattern({ cmd: 'inventory_que' })
  async getGreetingMessageAysnc(name: string): Promise<string> {
    return `Hey, Hello ${name}`;
  }

  @MessagePattern({ cmd: 'sum' })
  async accumulate(data: number[]): Promise<number> {
    return (data || []).reduce((a, b) => a + b);
  }
}
