import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { DatabaseModule, RmqModule } from '@app/shared';
import { AuthModule } from 'apps/auth/src/auth.module';
import { AUTH_SERVICE } from '@app/shared/auth/services';
import { Item, ItemSchema } from './schemas/item.schema';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { ItemsRepository } from './items.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/items/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    RmqModule.register({ name: AUTH_SERVICE }),

    AuthModule,
  ],
  controllers: [ItemsController],
  providers: [ItemsService, ItemsRepository],
})
export class ItemsModule {}
