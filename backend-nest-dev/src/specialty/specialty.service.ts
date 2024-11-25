/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
  async createSpecialty(data: Partial<Specialty> & { usuario_creacion: number }): Promise<Specialty> {
    // Convertir el nombre a mayúsculas para mantener consistencia
    data.nombre = data.nombre.toUpperCase();

    // Verificar si ya existe una especialidad con el mismo nombre
    const existingSpecialty = await this.specialtyRepository.findOne({ where: { nombre: data.nombre } });
    if (existingSpecialty) {
      throw new BadRequestException(`Ya existe una especialidad con el nombre ${data.nombre}`);
    }

    const specialty = this.specialtyRepository.create(data);
    return this.specialtyRepository.save(specialty);
  }

  // Obtener todas las especialidades
  // En el servicio (SpecialtyService)
  async getAllSpecialties(): Promise<Specialty[]> {
    return this.specialtyRepository.find({
      where: { estado: 1 }, // Filtrar solo las especialidades activas con estado = 1
    });
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
    data: Partial<Specialty> & { usuario_modificacion: number },
  ): Promise<Specialty> {
    data.fecha_modificacion = new Date();
    await this.specialtyRepository.update(id, data);
    return this.specialtyRepository.findOne({ where: { id } });
  }
  // Eliminar una especialidad (Eliminación lógica)
  async deleteSpecialty(id: number, usuario_modificacion: number): Promise<void> {
    await this.specialtyRepository.update(id, {
      estado: 0, // Eliminación lógica
      fecha_modificacion: new Date(),
      usuario_modificacion: usuario_modificacion,
    });
  }
}
