import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { CodificacionTurnosService } from './codificacion_turnos.service';
import { CreateCodificacionTurnoDto } from './dto/create-codificacion_turno.dto';
import { UpdateCodificacionTurnoDto } from './dto/update-codificacion_turno.dto';
import { CodificacionTurno } from './codificacion_turno.entity';

@Controller('codificacion-turnos')
export class CodificacionTurnosController {
  constructor(private readonly codificacionTurnosService: CodificacionTurnosService) {}

   // Endpoint para crear múltiples codificaciones de turnos
   @Post('multiple')
   async createMultiple(@Body('codificacionTurnos') createCodificacionTurnoDtos: CreateCodificacionTurnoDto[]): Promise<CodificacionTurno[]> {
     return this.codificacionTurnosService.createMultiple(createCodificacionTurnoDtos);
   }

   @Get('filter')
    async findFiltered(
      @Query('especialidadId') especialidadId: number,
      @Query('year') year: number,
      @Query('month') month: number,
      @Query('hospital') hospitalId: number,
    ): Promise<CodificacionTurno[]> {
      return this.codificacionTurnosService.findFiltered(especialidadId, year, month, hospitalId);
    }

   @Put('update-multiple')
   async updateMultipleCodificaciones(
     @Body() updateDtos: { codificacion_turnos_id: number; Turno?: string; Sigla?: string; Hora_Inicio?: string; Hora_Fin?: string; Carga_Horaria?: string }[],
   ): Promise<CodificacionTurno[]> {
     try {
       // Llamar al servicio para actualizar múltiples codificaciones
       const updatedCodificaciones = await this.codificacionTurnosService.updateMultipleCodificacionTurnos(updateDtos);
       return updatedCodificaciones;
     } catch (error) {
       console.error('Error al actualizar múltiples codificaciones:', error);
       throw error;
     }
   }

   @Get()
  async findAll(): Promise<CodificacionTurno[]> {
    return this.codificacionTurnosService.findAll();
  }

  @Post()
  create(@Body() createCodificacionTurnoDto: CreateCodificacionTurnoDto) {
    return this.codificacionTurnosService.create(createCodificacionTurnoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.codificacionTurnosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCodificacionTurnoDto: UpdateCodificacionTurnoDto) {
    return this.codificacionTurnosService.update(+id, updateCodificacionTurnoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.codificacionTurnosService.remove(+id);
  }
}
