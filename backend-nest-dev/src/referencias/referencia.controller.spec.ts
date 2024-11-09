import { Test, TestingModule } from "@nestjs/testing";
import { ReferenciaController } from "./referencia.controller";

describe('ReferenciaController', () =>{
    let  controller: ReferenciaController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          controllers: [ReferenciaController],
        }).compile();
    
        controller = module.get<ReferenciaController>(ReferenciaController);
    });
  
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});