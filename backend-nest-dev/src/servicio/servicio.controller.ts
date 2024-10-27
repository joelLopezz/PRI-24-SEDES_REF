// src/servicio/servicio.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServicioService } from './servicio.service';
import { Servicio } from './servicio.entity';

@Controller('servicio')
export class ServicioController {
  constructor(private readonly servicioService: ServicioService) {}

  // Crear un nuevo servicio
  @Post()
  async createServicio(
    @Body() servicioData: Partial<Servicio>,
  ): Promise<Servicio> {
    // Asignamos temporalmente el ID de usuario de creación
    servicioData.usuario_creacion = 1;
    return this.servicioService.create(servicioData);
  }

  // Obtener todos los servicios (incluye la relación con Especialidad)
  @Get()
  findAll() {
    return this.servicioService.findAll();
  }

  // Obtener un servicio por su ID (incluye la relación con Especialidad)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicioService.findOne(+id);
  }

  // Actualizar un servicio
  @Patch(':id')
  async updateServicio(
    @Param('id') id: number,
    @Body() servicioData: Partial<Servicio>,
  ): Promise<Servicio> {
    // Asignamos temporalmente el ID de usuario de modificación
    servicioData.usuario_modificacion = 1;
    return this.servicioService.updateServicio(id, servicioData);
  }

  // Eliminar un servicio
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicioService.deleteServicio(+id);
  }

  // Nuevo endpoint para obtener servicios por especialidad
  @Get('especialidad/:especialidadId')
  async getServiciosByEspecialidad(
    @Param('especialidadId') especialidadId: number,
  ): Promise<Servicio[]> {
    return this.servicioService.findByEspecialidad(especialidadId);
  }
}
