import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { Training } from './training.entity';

@Module({
  controllers: [TrainingController],
  imports: [TypeOrmModule.forFeature([Training])],
  providers: [TrainingService],
})
export class TrainingModule {}
