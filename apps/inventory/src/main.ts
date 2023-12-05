import { NestFactory } from '@nestjs/core';
import { InventoryModule } from './inventory.module';
import { RmqService } from '@app/shared';

import { BILLING_SERVICE } from 'apps/orders/constants/services';
import { RmqOptions } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/shared/auth/services';
import { ConfigService } from '@nestjs/config';
import { INVENTORY_SERVICE } from './constants/service';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(InventoryModule);
  app.use(cookieParser());
  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    origin: [
      'http://localhost:3000',
      'http://localhost:3006',
      'http://localhost:5173',
    ],
    credentials: true,
  });
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(BILLING_SERVICE));
  app.connectMicroservice(rmqService.getOptions(INVENTORY_SERVICE));
  app.connectMicroservice<RmqOptions>(
    rmqService.getOptions(AUTH_SERVICE, true),
  );
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
