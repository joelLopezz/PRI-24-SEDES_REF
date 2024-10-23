import { Test, TestingModule } from '@nestjs/testing';
import {PersonalSaludController} from './personal_salud.controller'

describe('PersonalSaludController', () => {
    let controller: PersonalSaludController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          controllers: [PersonalSaludController],
        }).compile();
    
        controller = module.get<PersonalSaludController>(PersonalSaludController);
    });
  
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});