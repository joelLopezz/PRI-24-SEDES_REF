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
  import { Servicio } from './servico.entity'
  
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
  
    // Obtener todos los servicios
    @Get()
    findAll() {
      return this.servicioService.findAll();
    }
  
    // Obtener un servicio por su ID
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
  }