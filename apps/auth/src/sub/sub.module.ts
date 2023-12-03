import { Module } from '@nestjs/common';
import { JwtSecretTMP, JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SubController } from './sub.controller';

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
