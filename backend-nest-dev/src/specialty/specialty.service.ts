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
    // Asegurarnos de que se actualice `usuario_modificacion` y `fecha_modificacion`
    data.fecha_modificacion = new Date();
    await this.specialtyRepository.update(id, data);
    return this.specialtyRepository.findOne({ where: { id } });
  }

  // Eliminar una especialidad (Eliminación lógica)
  async deleteSpecialty(id: number): Promise<void> {
    // Establecer `estado = 0` y actualizar `fecha_modificacion` y `usuario_modificacion`
    await this.specialtyRepository.update(id, {
      estado: 0,
      fecha_modificacion: new Date(),
      usuario_modificacion: 1, // Temporalmente 1, reemplazar por el ID del usuario en sesión en el futuro
    });
  }
}
