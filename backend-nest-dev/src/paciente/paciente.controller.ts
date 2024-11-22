// src/paciente/paciente.controller.ts
import { Controller, Get, Post, Patch, Param, Body, Req } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@Controller('pacientes')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Get()
  async findAll() {
    return this.pacienteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.pacienteService.findOne(id);
  }

  @Post()
  async create(@Body() createPacienteDto: CreatePacienteDto) {
    const userId = 123; // Usuario de prueba
    return this.pacienteService.create(createPacienteDto, userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePacienteDto: UpdatePacienteDto,
  ) {
    const userId = 123; // Usuario de prueba
    return this.pacienteService.update(id, updatePacienteDto, userId);
  }

  @Patch(':id/remove')
  async softRemove(@Param('id') id: number) {
    const userId = 123; // Usuario de prueba
    return this.pacienteService.softRemove(id, userId);
  }
}
