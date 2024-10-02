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
    @Body() specialtyData: Partial<Specialty>,
  ): Promise<Specialty> {
    return this.specialtyService.createSpecialty(specialtyData);
  }

  // Obtener todas las especialidades
  @Get()
  async getAllSpecialties(): Promise<Specialty[]> {
    return this.specialtyService.getAllSpecialties();
  }

  // Obtener una especialidad por ID
  async getSpecialtyById(@Param('id') id: number): Promise<Specialty> {
    return this.specialtyService.getSpecialtyById(id);
  }

  @Put(':id')
  async updateSpecialty(
    @Param('id') id: number,
    @Body() specialtyData: Partial<Specialty>,
  ): Promise<Specialty> {
    return this.specialtyService.updateSpecialty(id, specialtyData);
  }

  // Eliminar una especialidad
  // Eliminar una especialidad (Eliminación lógica)
  @Delete(':id')
  async deleteSpecialty(@Param('id') id: number): Promise<void> {
    return this.specialtyService.deleteSpecialty(id);
  }
}
