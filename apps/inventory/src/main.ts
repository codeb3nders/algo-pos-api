import { NestFactory } from '@nestjs/core';
import { InventoryModule } from './inventory.module';
import { RmqService } from '@app/shared';
import { AUTH_SERVICE } from '@app/shared/auth/services';

async function bootstrap() {
  const app = await NestFactory.create(InventoryModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(AUTH_SERVICE));
  await app.startAllMicroservices();
}
bootstrap();
