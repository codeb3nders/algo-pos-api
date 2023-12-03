import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SubController } from './sub.controller';
import { JwtSecretTMP, JwtStrategy } from '../strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: JwtSecretTMP,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JwtStrategy],
  controllers: [SubController],
})
export class SubModule {}
