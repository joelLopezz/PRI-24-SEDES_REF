import { Test, TestingModule } from '@nestjs/testing';
import { EstabEspecialidadService } from './estab_especialidad.service';

describe('EstabEspecialidadService', () => {
  let service: EstabEspecialidadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstabEspecialidadService],
    }).compile();

    service = module.get<EstabEspecialidadService>(EstabEspecialidadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
