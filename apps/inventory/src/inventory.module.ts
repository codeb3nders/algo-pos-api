import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { DatabaseModule, RmqModule } from '@app/shared';
import { AuthModule } from 'apps/auth/src/auth.module';
import { AUTH_SERVICE } from '@app/shared/auth/services';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { Inventory, InventorySchema } from './schemas/inventory.schema';
import { InventoryRepository } from './Inventory.repository';

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
    MongooseModule.forFeature([
      { name: Inventory.name, schema: InventorySchema },
    ]),
    RmqModule.register({ name: AUTH_SERVICE }),

    AuthModule,
  ],
  controllers: [InventoryController],
  providers: [InventoryService, InventoryRepository],
})
export class InventoryModule {}
