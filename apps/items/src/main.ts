import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ItemsModule } from './items.module';

async function bootstrap() {
  const app = await NestFactory.create(ItemsModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  console.log(configService.get('PORT'));
  await app.listen(configService.get('PORT'));
}
bootstrap();
