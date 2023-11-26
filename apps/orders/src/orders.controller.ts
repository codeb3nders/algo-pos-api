import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'apps/auth/src/guards/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() request: CreateOrderRequest, @Req() req: any) {
    const sampleORder = [
      {
        itemCode: 'a001',
        name: 'Americano',
        price: 40,
        qty: 1,
      },
      {
        itemCode: 'a002',
        name: 'Spanish latte',
        price: 80,
        qry: 2,
      },
    ];

    return this.ordersService.createOrder(request, req.cookies?.Authentication);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getOrders() {
    return this.ordersService.getOrders();
  }
}
