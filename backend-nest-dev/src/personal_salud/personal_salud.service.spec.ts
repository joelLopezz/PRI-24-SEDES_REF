import { Test, TestingModule } from '@nestjs/testing';
import { PersonalSaludService } from './personal_salud.service';

describe('PersonalSaludService', () => {
  let service: PersonalSaludService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalSaludService],
    }).compile();

    service = module.get<PersonalSaludService>(PersonalSaludService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
