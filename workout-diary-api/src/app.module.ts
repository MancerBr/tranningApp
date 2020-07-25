import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TrainingModule } from './training/training.module';
import { ExerciseModule } from './exercise/exercise.module';
import { TemplateModule } from './template/template.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.getTypeOrmConfig()),
    AuthModule,
    UserModule,
    TrainingModule,
    ExerciseModule,
    TemplateModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
