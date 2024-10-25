import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specialty } from './specialty.entity';

@Injectable()
export class SpecialtyService {
  constructor(
    @InjectRepository(Specialty)
    private specialtyRepository: Repository<Specialty>,
  ) {}

  // Crear una especialidad
  async createSpecialty(data: Partial<Specialty>): Promise<Specialty> {
    const specialty = this.specialtyRepository.create(data);
    return this.specialtyRepository.save(specialty);
  }

  // Obtener todas las especialidades
  async getAllSpecialties(): Promise<Specialty[]> {
    return this.specialtyRepository.find();
  }

  // Obtener todas las especialidades para un select, devolviendo solo id y nombre
  async getSpecialtiesForSelect(): Promise<Partial<Specialty[]>> {
    return this.specialtyRepository.find({
      select: ['id', 'nombre'], // Selecciona solo 'id' (que en la BD es 'especialidad_ID') y 'nombre'
    });
  }

  // Obtener una especialidad por ID
  async getSpecialtyById(id: number): Promise<Specialty> {
    const specialty = await this.specialtyRepository.findOne({ where: { id } });
    if (!specialty) {
      throw new NotFoundException(`Especialidad con ID ${id} no encontrada`);
    }

    return specialty;
  }

  // Actualizar una especialidad
  async updateSpecialty(
    id: number,
    data: Partial<Specialty>,
  ): Promise<Specialty> {
    data.fecha_modificacion = new Date();
    await this.specialtyRepository.update(id, data);
    return this.specialtyRepository.findOne({ where: { id } });
  }

  // Eliminar una especialidad (Eliminación lógica)
  async deleteSpecialty(id: number): Promise<void> {
    await this.specialtyRepository.update(id, {
      estado: 0, // Eliminación lógica
      fecha_modificacion: new Date(),
      usuario_modificacion: 1, // Temporalmente 1
    });
  }
}