import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { Auth } from './auth.entity';
import { config} from '../config/config';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Auth]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: config.getJWTConfig().jwtTokenSecretKey,
      signOptions: { expiresIn: config.getJWTConfig().jwtExpiresIn },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
