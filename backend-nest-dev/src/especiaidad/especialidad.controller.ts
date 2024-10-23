import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
  } from '@nestjs/common';
  import { EspecialidadService } from './especialidad.service';
  import { Especialidad } from './especialidad.entity';
  
  @Controller('specialties')
  export class EspecialidadController {
    constructor(private readonly specialtyService: EspecialidadService) {}
  
    // Crear una nueva especialidad
    @Post()
    async createSpecialty(
      @Body() specialtyData: Partial<Especialidad>,
    ): Promise<Especialidad> {
      // Simulación: asignar el ID del usuario actual (en este caso "1") a usuario_creacion
      specialtyData.usuario_creacion = 1;
      return this.specialtyService.createSpecialty(specialtyData);
    }
  
    // Obtener todas las especialidades
    @Get()
    async getAllSpecialties(): Promise<Especialidad[]> {
      return this.specialtyService.getAllSpecialties();
    }
  
    // Obtener una especialidad por ID
    @Get(':id')
    async getSpecialtyById(@Param('id') id: number): Promise<Especialidad> {
      return this.specialtyService.getSpecialtyById(id);
    }
  
    // Actualizar una especialidad por ID
    @Put(':id')
    async updateSpecialty(
      @Param('id') id: number,
      @Body() specialtyData: Partial<Especialidad>,
    ): Promise<Especialidad> {
      // Simulación: asignar el ID del usuario actual (en este caso "1") a usuario_modificacion
      specialtyData.usuario_modificacion = 1;
      return this.specialtyService.updateSpecialty(id, specialtyData);
    }
  
    // Eliminar una especialidad (Eliminación lógica)
    @Delete(':id')
    async deleteSpecialty(@Param('id') id: number): Promise<void> {
      return this.specialtyService.deleteSpecialty(id);
    }
  }