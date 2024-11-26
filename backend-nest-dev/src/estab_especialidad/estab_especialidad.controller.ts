import { Controller, Post, Get, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { EstabEspecialidadService } from './estab_especialidad.service';
import { Specialty } from 'src/specialty/specialty.entity';
import { AuthService } from '../Auth/auth.service';

@Controller('estab-especialidad')
export class EstabEspecialidadController {
  constructor(
    private readonly estabEspecialidadService: EstabEspecialidadService,
    private authService: AuthService,
  ) {}


  // Obtener todas las especialidades del establecimiento del usuario logueado
  @Get('especialidades')
  async getEspecialidadHospital() {
    // Obtener el usuario autenticado (que contiene el establecimientoID)
    const currentUser = await this.authService.getCurrentUser();

    // Verificar que el usuario tenga el establecimientoID
    // if (!currentUser || !currentUser.establecimientoID) {
    //   throw new NotFoundException('No se pudo obtener el establecimiento del usuario.');
    // }

    // Llamar al servicio para obtener las especialidades asociadas al establecimiento
    return this.estabEspecialidadService.getEspecialidadesPorEstablecimiento();
  }


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
  // En estab-especialidad.controller.ts
  @Delete(':id')
  async removeEspecialidad(@Param('id') id: number) {
    console.log(`ID recibido: ${id}`); // Log para verificar el valor del ID
    return this.estabEspecialidadService.deleteRelacion(id);
  }
}
