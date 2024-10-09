import { Test, TestingModule } from '@nestjs/testing';
import { RedCordinacionService } from './red-cordinacion.service';

describe('RedCordinacionService', () => {
  let service: RedCordinacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedCordinacionService],
    }).compile();

    service = module.get<RedCordinacionService>(RedCordinacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
