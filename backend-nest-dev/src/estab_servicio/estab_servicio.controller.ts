import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { EstabServicioService } from './estab_servicio.service';
import { EstablecimientoSaludServicio } from './estab_servicio.entity';

@Controller('estab-servicio')
export class EstabServicioController {
  constructor(private readonly estabServicioService: EstabServicioService) {}

  // Asociar un servicio a un establecimiento
  @Post()
  async addServicio(
    @Body('establecimientoId') establecimientoId: number,
    @Body('servicioId') servicioId: number,
  ): Promise<EstablecimientoSaludServicio> {
    return this.estabServicioService.addServicio(establecimientoId, servicioId);
  }

  // Asociar múltiples servicios a un establecimiento
  @Post('multiple')
  async addMultipleServicios(
    @Body()
    serviciosData: { establecimiento_salud_id: number; servicio_id: number }[],
  ): Promise<EstablecimientoSaludServicio[]> {
    return this.estabServicioService.addMultipleServicios(serviciosData);
  }

  // Obtener los servicios de un establecimiento
  @Get(':establecimientoId')
  async getServiciosPorEstablecimiento(
    @Param('establecimientoId') establecimientoId: number,
  ): Promise<EstablecimientoSaludServicio[]> {
    return this.estabServicioService.getServiciosPorEstablecimiento(
      establecimientoId,
    );
  }

  // Obtener los servicios de una especialidad específica en un establecimiento
  @Get(
    'establecimiento/:establecimientoId/especialidad/:especialidadId/servicios',
  )
  async getServiciosByEspecialidad(
    @Param('establecimientoId') establecimientoId: number,
    @Param('especialidadId') especialidadId: number,
  ) {
    return this.estabServicioService.findServiciosByEstablecimientoAndEspecialidad(
      establecimientoId,
      especialidadId,
    );
  }

  // Obtener los servicios disponibles (no seleccionados) para una especialidad en un establecimiento
  @Get(
    'establecimiento/:establecimientoId/especialidad/:especialidadId/disponibles',
  )
  async getAvailableServiciosByEspecialidad(
    @Param('establecimientoId') establecimientoId: number,
    @Param('especialidadId') especialidadId: number,
  ) {
    return this.estabServicioService.findAvailableServiciosByEspecialidad(
      establecimientoId,
      especialidadId,
    );
  }

  // Actualizar atributos específicos de un servicio en un establecimiento
  @Patch(':relacionId')
  async updateServicioAttributes(
    @Param('relacionId') relacionId: number,
    @Body() attributes: Partial<EstablecimientoSaludServicio>,
  ): Promise<EstablecimientoSaludServicio> {
    return this.estabServicioService.updateServicioAttributes(
      relacionId,
      attributes,
    );
  }
}
