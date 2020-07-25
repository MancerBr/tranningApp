import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseProcessController } from './exercise-process.controller';

describe('ExerciseProcess Controller', () => {
  let controller: ExerciseProcessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseProcessController],
    }).compile();

    controller = module.get<ExerciseProcessController>(ExerciseProcessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
