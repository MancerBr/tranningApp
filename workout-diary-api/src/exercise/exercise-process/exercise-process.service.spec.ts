import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseProcessService } from './exercise-process.service';

describe('ExerciseProcessService', () => {
  let service: ExerciseProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseProcessService],
    }).compile();

    service = module.get<ExerciseProcessService>(ExerciseProcessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
