import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsSchema } from './entities/product.entity';
import { ProductsRepository } from '../repository/products.repository';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, RmqModule } from '@app/shared';
import { AUTH_SERVICE } from '@app/shared/auth/services';
import { BILLING_SERVICE } from 'apps/orders/constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/Productss/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Products', schema: ProductsSchema }]),
    RmqModule.register({
      name: AUTH_SERVICE,
    }),
    RmqModule.register({
      name: BILLING_SERVICE,
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
