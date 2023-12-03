import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SubModule } from './sub/sub.module';

@Module({
  imports: [SubModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
