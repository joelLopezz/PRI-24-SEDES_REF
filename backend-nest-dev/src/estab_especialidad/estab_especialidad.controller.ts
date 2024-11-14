import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { EstabEspecialidadService } from './estab_especialidad.service';

@Controller('estab-especialidad')
export class EstabEspecialidadController {
  constructor(
    private readonly estabEspecialidadService: EstabEspecialidadService,
  ) {}

  // Agregar especialidades a un establecimiento (múltiples especialidades o una sola)
  @Post()
  async addEspecialidades(
    @Body('establecimientoId') establecimientoId: number,
    @Body('especialidades') especialidadIds: number[], // Recibimos un array de especialidades seleccionadas
  ) {
    return this.estabEspecialidadService.createMultiple(
      establecimientoId,
      especialidadIds,
    );
  }

  // Obtener las especialidades de un establecimiento
  @Get('especialidades/:establecimientoId')
  async getEspecialidades(
    @Param('establecimientoId') establecimientoId: number,
  ) {
    return this.estabEspecialidadService.findEspecialidadesByEstablecimiento(
      establecimientoId,
    );
  }

  // Eliminar una especialidad de un establecimiento
  @Delete()
  async removeEspecialidad(
    @Body('establecimientoId') establecimientoId: number,
    @Body('especialidadId') especialidadId: number,
  ) {
    return this.estabEspecialidadService.deleteRelacion(
      establecimientoId,
      especialidadId,
    );
  }
}