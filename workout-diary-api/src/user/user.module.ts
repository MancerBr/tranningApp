import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';

@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  exports: [TypeOrmModule.forFeature([User]), UserService],
})
export class UserModule {}
