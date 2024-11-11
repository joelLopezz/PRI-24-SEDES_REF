import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, Put, InternalServerErrorException } from '@nestjs/common';
import { RolTurnosService } from './rol_turnos.service';
import { CreateRolTurnoDto } from './dto/create-rol_turno.dto';
import { UpdateRolTurnoDto } from './dto/update-rol_turno.dto';
import { RolTurno } from './rol_turno.entity';

import { CreateAreaPersonalDto } from '../area_personal/dto/create-area_personal.dto';

@Controller('rol-turnos')
export class RolTurnosController {
  constructor(private readonly rolTurnosService: RolTurnosService) {}

  // Endpoint para insertar múltiples turnos
  @Post('Registro')
  async createMultiple(@Body() createRolTurnosDto: CreateRolTurnoDto[]) {
    return this.rolTurnosService.createMultiple(createRolTurnosDto);
  }

  // Endpoint para crear múltiples turnos y áreas
  @Post('multiple-with-areas')
  async createMultipleWithAreas(
    @Body('turnos') createRolTurnosDto: CreateRolTurnoDto[],
    @Body('areas') createAreaPersonalDtos: CreateAreaPersonalDto[],) {
    return this.rolTurnosService.createMultipleWithAreas(createRolTurnosDto, createAreaPersonalDtos);
  }

  @Get('Especialidades')
  async getListaEspecialidades(): Promise<any[]> {
    return this.rolTurnosService.obtenerReporteEspecialidades();
  }

  @Get('Listado')
  async getTurnosPorMesYEspecialidad(@Query() query: { mes: string, anio: string, especialidadId: string, hospitalId: string }) {
    // Verificar si los parámetros existen y son válidos
    const mesNumber = parseInt(query.mes, 10);
    const anioNumber = parseInt(query.anio, 10);
    const especialidadIdNumber = parseInt(query.especialidadId, 10);
    const hospitalIdNumber = parseInt(query.hospitalId, 10);
    if (isNaN(mesNumber) || isNaN(anioNumber) || isNaN(especialidadIdNumber) || isNaN(hospitalIdNumber)) {
      throw new BadRequestException('Todos los parámetros deben ser números válidos.');
    }

    // Validaciones adicionales de rango
    if (mesNumber < 1 || mesNumber > 12) {
      throw new BadRequestException('El mes proporcionado no es válido. Debe estar entre 1 y 12.');
    }
    if (anioNumber < 1900) {
      throw new BadRequestException('El año proporcionado no es válido. Debe ser mayor a 1900.');
    }
    if (especialidadIdNumber <= 0) {
      throw new BadRequestException('El ID de la especialidad no es válido.');
    }
    if (hospitalIdNumber <= 0) {
      throw new BadRequestException('El ID del hospital no es válido.');
    }


    try {
      const result = await this.rolTurnosService.findTurnosByMesYEspecialidad(mesNumber, anioNumber, especialidadIdNumber, hospitalIdNumber);
      return result;
    } catch (error) {
      throw error; // Volver a lanzar el error para que el manejo de excepciones lo capture
    }
  }

  @Put('update-multiple-with-areas')
  async updateMultipleWithAreas(
    @Body()
    updateData: {
      turnos: { turno_ID: number; codificacion_codificacion_turno_ID: number | null }[];
      areas: { area_personal_salud_ID: number; area: string }[];
    },
  ): Promise<any> {
    try {
      const { turnos, areas } = updateData;
      const result = await this.rolTurnosService.updateMultipleWithAreas(
        turnos,
        areas,
      );
      return result;
    } catch (error) {
      console.error('Error al actualizar múltiples turnos y áreas:', error);
      throw new InternalServerErrorException('Error al actualizar múltiples turnos y áreas.');
    }
  }

  // Actualizar múltiples turnos
  @Put('update-multiple')
  async updateMultipleCodificacionTurno(
    @Body() updateDtos: { turno_ID: number; codificacion_codificacion_turno_ID: number | null }[],
  ): Promise<RolTurno[]> {
    try {
      // Llamar al servicio para actualizar múltiples turnos
      const updatedTurnos = await this.rolTurnosService.updateMultipleCodificacionTurno(updateDtos);
      return updatedTurnos;
    } catch (error) {
      console.error('Error al actualizar múltiples turnos:', error);
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.rolTurnosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolTurnosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRolTurnoDto: UpdateRolTurnoDto) {
    return this.rolTurnosService.update(+id, updateRolTurnoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolTurnosService.remove(+id);
  }
}