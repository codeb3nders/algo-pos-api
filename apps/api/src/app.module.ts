import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule, RmqModule } from '@app/shared';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AUTH_SERVICE } from '@app/shared/auth/services';
import { BILLING_SERVICE } from 'apps/orders/constants/services';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { AccountModule } from './account/account.module';
import { SalesModule } from './sales/sales.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/orders/.env',
    }),
    DatabaseModule,
    ProductsModule,
    AccountModule,
    SalesModule,
    UserModule,
    RmqModule.register({
      name: AUTH_SERVICE,
    }),
    RmqModule.register({
      name: BILLING_SERVICE,
    }),
  ],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
