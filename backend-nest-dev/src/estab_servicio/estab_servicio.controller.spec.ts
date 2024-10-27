import { Test, TestingModule } from '@nestjs/testing';
import { EstabServicioController } from './estab_servicio.controller';

describe('EstabServicioController', () => {
  let controller: EstabServicioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstabServicioController],
    }).compile();

    controller = module.get<EstabServicioController>(EstabServicioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
