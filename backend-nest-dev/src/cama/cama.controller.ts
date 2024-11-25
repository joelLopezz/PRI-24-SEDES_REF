import { Controller, Get, Post, Patch, Param, Body, BadRequestException } from '@nestjs/common';
import { CamaService } from './cama.service';

@Controller('cama')
export class CamaController {
  constructor(private readonly camaService: CamaService) {}

  // Endpoint para obtener todas las especialidades con atributos de camas de un hospital específico
  @Get('especialidades')
  async getEspecialidadesPorHospital() {
    return await this.camaService.getEspecialidadesPorHospital();
  }

  // Endpoint para obtener todas las especialidades (combo de especialidades)
  @Get('comboEspecialidad')
  async getEspecialidades() {
    return await this.camaService.findAllEspecialidades();
  }

  // Endpoint para obtener todos los servicios (combo de servicios)
  @Get('comboServicio')
  async getServicios() {
    return await this.camaService.findAllServicios();
  }

  @Post()
  async crearCama(@Body() datos: any) {
    const { datosCama, datosHistorial } = datos;
    return this.camaService.crearCamaConHistorial(datosCama, datosHistorial);
  }
}
