import { NestFactory } from '@nestjs/core';
import { InventoryModule } from './inventory.module';

async function bootstrap() {
  const app = await NestFactory.create(InventoryModule);
  app.setGlobalPrefix('api');
  await app.listen(4001, () =>
    console.log('Inventory service is listening at PORT 4001'),
  );
}
bootstrap();
