import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemRequest } from './dto/create-item.request';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  createItem(@Body() request: CreateItemRequest) {
    return this.itemsService.createOrder(request);
  }

  @Get()
  getItems() {
    return this.itemsService.get();
  }
}
