import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'apps/auth/src/guards/jwt-auth.guard';

import { InventoryService } from './inventory.service';
import { CreateInventoryRequest } from './dto/create-inventory.request';

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
}
