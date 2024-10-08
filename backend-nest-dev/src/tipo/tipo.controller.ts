// src/tipo/tipo.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { TipoService } from './tipo.service';
import { Tipo } from './tipo.entity';

@Controller('tipo')
export class TipoController {
  constructor(private readonly tipoService: TipoService) {}

  // Obtener solo los tipos activos (estado = 1)
  @Get('activos')
  findActive(): Promise<Tipo[]> {
    return this.tipoService.findActive();
  }

  // Obtener todos los tipos
  @Get()
  findAll(): Promise<Tipo[]> {
    return this.tipoService.findAll();
  }

  // Obtener un tipo específico por ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tipo> {
    return this.tipoService.findOne(+id);
  }
}
