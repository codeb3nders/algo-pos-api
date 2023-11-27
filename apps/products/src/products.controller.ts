import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductRequest } from './dto/create-product.request';
import { JwtAuthGuard } from 'apps/auth/src/guards/jwt-auth.guard';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getHello(): string {
    return this.productsService.getHello();
  }

  @Get('products/:id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('products')
  getProducts() {
    return this.productsService.getProducts();
  }

  @Post('products')
  @UseGuards(JwtAuthGuard)
  async createProduct(@Body() request: CreateProductRequest) {
    return this.productsService.createProduct(request);
  }

  @Put('products/:id')
  @UseGuards(JwtAuthGuard)
  async updateProduct(
    @Param('id') id: string,
    @Body() request: CreateProductRequest,
  ) {
    return this.productsService.updateProduct(id, request);
  }
}
