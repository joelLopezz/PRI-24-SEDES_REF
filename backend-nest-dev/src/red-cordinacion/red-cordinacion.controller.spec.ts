import { Test, TestingModule } from '@nestjs/testing';
import { RedCordinacionController } from './red-cordinacion.controller';

describe('RedCordinacionController', () => {
  let controller: RedCordinacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedCordinacionController],
    }).compile();

    controller = module.get<RedCordinacionController>(RedCordinacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
