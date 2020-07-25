import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { ExerciseProcessController } from './exercise-process/exercise-process.controller';
import { ExerciseProcessService } from './exercise-process/exercise-process.service';
import { Exercise } from './exercise.entity';
import { ExerciseProcess } from './exercise-process/exercise-process.entity';

@Module({
  providers: [ExerciseService, ExerciseProcessService],
  imports: [TypeOrmModule.forFeature([Exercise, ExerciseProcess])],
  controllers: [ExerciseController, ExerciseProcessController],
})
export class ExerciseModule {}
