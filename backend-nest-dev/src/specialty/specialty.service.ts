import { Injectable } from '@nestjs/common';
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

  // Obtener una especialidad por ID
  async getSpecialtyById(id: number): Promise<Specialty> {
    return this.specialtyRepository.findOne({ where: { id } });
  }

  // Actualizar una especialidad
  async updateSpecialty(
    id: number,
    data: Partial<Specialty>,
  ): Promise<Specialty> {
    await this.specialtyRepository.update(id, data);
    return this.specialtyRepository.findOne({ where: { id } });
  }

  // Eliminar una especialidad (Eliminación lógica)
  async deleteSpecialty(id: number): Promise<void> {
    await this.specialtyRepository.update(id, { status: 0 });
  }
}
