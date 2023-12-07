import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ItemsModule } from './items.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ItemsModule);
  app.use(cookieParser());
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3006',
      'http://localhost:5173',
    ],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  console.log(configService.get('PORT'));

  await app.listen(3006);
}
bootstrap();
