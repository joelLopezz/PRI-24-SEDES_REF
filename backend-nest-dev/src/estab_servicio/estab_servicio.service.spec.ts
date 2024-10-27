import { Test, TestingModule } from '@nestjs/testing';
import { EstabServicioService } from './estab_servicio.service';

describe('EstabServicioService', () => {
  let service: EstabServicioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstabServicioService],
    }).compile();

    service = module.get<EstabServicioService>(EstabServicioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
