import { Test, TestingModule } from '@nestjs/testing';
import { EstabEspecialidadController } from './estab_especialidad.controller';

describe('EstabEspecialidadController', () => {
  let controller: EstabEspecialidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstabEspecialidadController],
    }).compile();

    controller = module.get<EstabEspecialidadController>(
      EstabEspecialidadController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
