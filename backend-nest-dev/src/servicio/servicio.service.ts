import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from './servicio.entity';
import { Specialty } from '../specialty/specialty.entity'; // Importar la entidad Especialidad

@Injectable()
export class ServicioService {
  constructor(
    @InjectRepository(Servicio)
    private servicioRepository: Repository<Servicio>,
    @InjectRepository(Specialty)
    private specialtyRepository: Repository<Specialty>, // Repositorio para Especialidad
  ) {}

  // Crear un nuevo servicio
  async create(servicioData: Partial<Servicio>): Promise<Servicio> {
    const newServicio = this.servicioRepository.create(servicioData);
    return await this.servicioRepository.save(newServicio);
  }

  // Obtener todos los servicios (relacionado con especialidad si es necesario)
  async findAll(): Promise<Servicio[]> {
    return await this.servicioRepository.find({
      relations: ['especialidad'], // Incluir la relación con Especialidad
    });
  }

  // Obtener un servicio por su ID
  async findOne(id: number): Promise<Servicio> {
    const servicio = await this.servicioRepository.findOne({
      where: { servicio_ID: id },
      relations: ['especialidad'], // Incluir la relación con Especialidad
    });
    if (!servicio) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    }
    return servicio;
  }

  // Actualizar un servicio
  async updateServicio(id: number, data: Partial<Servicio>): Promise<Servicio> {
    if (data.especialidad_ID) {
      // Si se envía especialidad_ID, verificar que exista la especialidad
      const especialidad = await this.specialtyRepository.findOne({
        where: { id: data.especialidad_ID },
      });
      if (!especialidad) {
        throw new NotFoundException(
          `Especialidad con ID ${data.especialidad_ID} no encontrada`,
        );
      }
      data.especialidad = especialidad; // Asignar la especialidad al servicio
    }

    data.fecha_modificacion = new Date(); // Actualizar la fecha de modificación
    await this.servicioRepository.update(id, data);

    // Retornar el servicio actualizado con las relaciones
    return this.servicioRepository.findOne({
      where: { servicio_ID: id },
      relations: ['especialidad'], // Incluir la especialidad en la respuesta
    });
  }

  // Eliminar un servicio (eliminación lógica)
  async deleteServicio(id: number): Promise<void> {
    await this.servicioRepository.update(id, {
      estado: 0,
      fecha_modificacion: new Date(),
      usuario_modificacion: 1, // Temporalmente 1, reemplazar con el ID del usuario de sesión
    });
  }
}
