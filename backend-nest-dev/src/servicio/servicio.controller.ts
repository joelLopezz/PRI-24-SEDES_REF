/* eslint-disable prettier/prettier */
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
    @Body() servicioData: Partial<Servicio> & { usuario_ID: number },
  ): Promise<Servicio> {
    return this.servicioService.create(servicioData);
  }

  // Obtener todos los servicios (incluye la relación con Especialidad)
  @Get()
  findAll() {
    return this.servicioService.findAll();
  }

  //Lista todos los serivicioc(id y jnombre)
  @Get('list')
  async getSpecialtiesForSelect(): Promise<Partial<Servicio[]>> {
    return this.servicioService.getServiceForSelect();
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
    @Body() servicioData: Partial<Servicio> & { usuario_ID: number }, // Recibe usuario_ID
  ): Promise<Servicio> {
    // Pasa el usuario_ID como un parámetro adicional
    return this.servicioService.updateServicio(id, servicioData);
  }

  // Eliminar un servicio
  @Delete(':id')
  async remove(@Param('id') id: number, @Body('usuario_ID') usuario_ID: number) {
    return this.servicioService.deleteServicio(id, usuario_ID);
  }

  // Nuevo endpoint para obtener servicios por especialidad
  @Get('especialidad/:especialidadId')
  async getServiciosByEspecialidad(
    @Param('especialidadId') especialidadId: number,
  ): Promise<Servicio[]> {
    return this.servicioService.findByEspecialidad(especialidadId);
  }
}
