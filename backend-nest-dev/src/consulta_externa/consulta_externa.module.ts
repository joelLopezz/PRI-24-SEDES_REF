import { Module } from '@nestjs/common';
import { ConsultaExternaService } from './consulta_externa.service';
import { ConsultaExternaController } from './consulta_externa.controller';

@Module({
  controllers: [ConsultaExternaController],
  providers: [ConsultaExternaService],
})
export class ConsultaExternaModule {}
