import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especialidad } from './especialidad.entity';

@Injectable()
export class EspecialidadService {
  constructor(
    @InjectRepository(Especialidad)
    private specialtyRepository: Repository<Especialidad>,
  ) {}

  // Crear una especialidad
  async createSpecialty(data: Partial<Especialidad>): Promise<Especialidad> {
    const specialty = this.specialtyRepository.create(data);
    return this.specialtyRepository.save(specialty);
  }

  // Obtener todas las especialidades
  async getAllSpecialties(): Promise<Especialidad[]> {
    return this.specialtyRepository.find();
  }

  // Obtener una especialidad por ID
  async getSpecialtyById(id: number): Promise<Especialidad> {
    return this.specialtyRepository.findOne({ where: { especialidad_ID: id} });
  }

  // Actualizar una especialidad
  async updateSpecialty(
    id: number,
    data: Partial<Especialidad>,
  ): Promise<Especialidad> {
    // Asegurarnos de que se actualice `usuario_modificacion` y `fecha_modificacion`
    data.fecha_modificacion = new Date();
    await this.specialtyRepository.update(id, data);
    return this.specialtyRepository.findOne({ where: { especialidad_ID: id } });
  }

  // Eliminar una especialidad (Eliminación lógica)
  async deleteSpecialty(id: number): Promise<void> {
    // Establecer `estado = 0` y actualizar `fecha_modificacion` y `usuario_modificacion`
    await this.specialtyRepository.update(id, {
      estado: 0,
      fecha_modificacion: new Date(),
    });
  }




  //cargado de combox
  async findAllEspecialidades(): Promise<{ especialidad_ID: number; nombre: string }[]> {
    return await this.specialtyRepository
      .createQueryBuilder('especialidad')
      .select(['especialidad.especialidad_ID', 'especialidad.nombre'])
      .getRawMany();
  }
}