// src/referencia/referencia.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Referencia } from './referencia.entity';
import { ReferenciaService } from './referencia.service';
import { ReferenciaController } from './referencia.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Referencia])],
  providers: [ReferenciaService],
  controllers: [ReferenciaController],
  exports: [ReferenciaService],
})
export class ReferenciaModule {}
