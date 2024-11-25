// src/referencia/referencia.controller.ts
import { Controller, Get, Post, Patch, Param, Body, Req, Query  } from '@nestjs/common';
import { ReferenciaService } from './referencia.service';
import { CreateReferenciaDto } from './dto/create-referencia.dto';
import { UpdateReferenciaDto } from './dto/update-referencia.dto';

@Controller('referencias')
export class ReferenciaController {
  constructor(private readonly referenciaService: ReferenciaService) {}

  @Get()
  async findAll() {
    return this.referenciaService.findAll();
  }
  
  @Get('estado/1')
  async findPendientes() {
    return this.referenciaService.findByEstado(1); // Estado 1: Pendientes
  }

  @Get('estado/2')
  async findRevisadas() {
    return this.referenciaService.findByEstado(2); // Estado 2: Revisadas
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.referenciaService.findOne(id);
  }

  /*@Post()
  async create(@Body() createReferenciaDto: CreateReferenciaDto) {
    const userId = 123; // Usuario de prueba; modificar según sea necesario
    return this.referenciaService.create(createReferenciaDto, userId);
  }*/

    @Post()
    async create(@Body() createReferenciaDto: CreateReferenciaDto) {
      const userId = 123;
      if (!createReferenciaDto.fecha_recepcion) {
        createReferenciaDto.fecha_recepcion = null; // Asegura que sea null
      }
      return this.referenciaService.create(createReferenciaDto, userId);
    }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateReferenciaDto: UpdateReferenciaDto,
  ) {
    const userId = 123; // Usuario de prueba; modificar según sea necesario
    return this.referenciaService.update(id, updateReferenciaDto, userId);
  }

  @Patch(':id/remove')
  async softRemove(@Param('id') id: number) {
    const userId = 123; // Usuario de prueba; modificar según sea necesario
    return this.referenciaService.softRemove(id, userId);
  }
}
