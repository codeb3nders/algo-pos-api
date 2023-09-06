import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://codeb3nder:49aECeyT1HwcAwet@cluster0.ngnmku1.mongodb.net/',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
