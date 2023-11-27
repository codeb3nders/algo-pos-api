import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from 'apps/auth/src/guards/jwt-auth.guard';

import { InventoryService } from './inventory.service';
import { CreateInventoryRequest } from './dto/create-inventory.request';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createInventory(@Body() request: CreateInventoryRequest) {
    return this.inventoryService.createInventory(request);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getInventory() {
    return this.inventoryService.getInventory();
  }

  @MessagePattern('order_created')
  async updateInventory(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      const { request } = data;

      const inventoryCodes = this.extractInventoryItemCode(
        request.orderDetails,
      );

      inventoryCodes.forEach((code) => {
        this.inventoryService.updateInventory(code);
      });
    } catch (error) {
      console.error({ error });
    }
    channel.ack(originalMessage);
  }

  @Put(':code')
  @UseGuards(JwtAuthGuard)
  async update(@Param('code') code: string) {
    return this.inventoryService.updateInventory(code);
  }

  extractInventoryItemCode(orderDetailsArray: any) {
    return [].concat(
      ...orderDetailsArray.map((orderDetail) => orderDetail.linkInventory),
    );
  }
}
