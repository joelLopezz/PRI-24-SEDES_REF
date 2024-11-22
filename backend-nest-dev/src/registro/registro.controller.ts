// src/registro/registro.controller.ts
import { Controller, Post, Body, Param, Patch, Delete, Get } from '@nestjs/common';
import { RegistroService } from './registro.service';
import { CreatePacienteDto } from '../paciente/dto/create-paciente.dto';
import { CreateReferenciaDto } from '../referencia/dto/create-referencia.dto';
import { UpdatePacienteDto } from '../paciente/dto/update-paciente.dto';
import { UpdateReferenciaDto } from '../referencia/dto/update-referencia.dto';
import { RegistroCompleteDto } from './dto/registro.dto';

@Controller('registro')
export class RegistroController {
  constructor(private readonly registroService: RegistroService) {}

  @Post()
  async create(@Body() registroDto: RegistroCompleteDto) {
    const userId = 123; // Usuario de prueba
    return await this.registroService.createRegistro(
      registroDto.paciente,
      registroDto.referencia,
      userId
    );
  }

  @Get(':id')
  async getRegistro(@Param('id') id: number) {
    return await this.registroService.getRegistroById(id);
  }

  @Patch(':id')
  async updateRegistro(
    @Param('id') id: number,
    @Body() updatePacienteDto: any,
    @Body() updateReferenciaDto: any,
  ) {
    const userId = 123; // Usuario de prueba
    return await this.registroService.updateRegistro(id, updatePacienteDto, updateReferenciaDto, userId);
  }

  @Delete(':id')
  async deleteRegistro(@Param('id') id: number) {
    const userId = 123; // Usuario de prueba
    return await this.registroService.deleteRegistro(id, userId);
  }
}
