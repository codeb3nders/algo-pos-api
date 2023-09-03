import { NestFactory } from '@nestjs/core';
import { InventoryModule } from './inventory.module';
import { RmqService } from '@app/shared';

import { BILLING_SERVICE } from 'apps/orders/constants/services';
import { RmqOptions } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/shared/auth/services';

async function bootstrap() {
  const app = await NestFactory.create(InventoryModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(BILLING_SERVICE));
  app.connectMicroservice<RmqOptions>(
    rmqService.getOptions(AUTH_SERVICE, true),
  );
  await app.startAllMicroservices();
}
bootstrap();
