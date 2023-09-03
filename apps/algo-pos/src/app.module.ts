import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule, DatabaseModule, RmqModule } from '@app/shared';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AUTH_SERVICE } from '@app/shared/auth/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/algo-pos/.env',
    }),
    DatabaseModule,
    RmqModule.register({
      name: AUTH_SERVICE,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
