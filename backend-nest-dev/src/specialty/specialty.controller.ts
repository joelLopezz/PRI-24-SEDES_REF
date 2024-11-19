/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { Specialty } from './specialty.entity';

@Controller('specialties')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  // Crear una nueva especialidad
  @Post()
  async createSpecialty(
    @Body() specialtyData: Partial<Specialty> & { usuario_creacion: number },
  ): Promise<Specialty> {
    return this.specialtyService.createSpecialty(specialtyData);
  }

  // Obtener todas las especialidades
  @Get()
  async getAllSpecialties(): Promise<Specialty[]> {
    return this.specialtyService.getAllSpecialties();
  }

  @Get('list') // Cambia 'select' a algo más específico como 'list'
  async getSpecialtiesForSelect(): Promise<Partial<Specialty[]>> {
    return this.specialtyService.getSpecialtiesForSelect();
  }

  // Obtener una especialidad por ID
  @Get(':id')
  async getSpecialtyById(@Param('id') id: number): Promise<Specialty> {
    return this.specialtyService.getSpecialtyById(id);
  }

  // Actualizar una especialidad por ID
  @Put(':id')
  async updateSpecialty(
    @Param('id') id: number,
    @Body() specialtyData: Partial<Specialty> & { usuario_modificacion: number },
  ): Promise<Specialty> {
    return this.specialtyService.updateSpecialty(id, specialtyData);
  }

  // Eliminar una especialidad (Eliminación lógica)
  @Delete(':id')
  async deleteSpecialty(
    @Param('id') id: number,
    @Body() deleteData: { usuario_modificacion: number },
  ): Promise<void> {
    return this.specialtyService.deleteSpecialty(id, deleteData.usuario_modificacion);
  }
}
