import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { ItemsService } from './items.service';
import { JwtAuthGuard } from 'apps/auth/src/guards/jwt-auth.guard';
import { CreateItemRequest } from './dto/create-item.request';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createItem(@Body() request: CreateItemRequest, @Req() req: any) {
    return this.itemsService.createItem(request);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getItems() {
    return this.itemsService.getItems();
  }
}
