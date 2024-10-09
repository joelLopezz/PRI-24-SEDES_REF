import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedCordinacion } from './red-cordinacion.entity';

@Injectable()
export class RedCordinacionService {
  constructor(
    @InjectRepository(RedCordinacion)
    private redCordinacionRepository: Repository<RedCordinacion>,
  ) {}

  // Crear una nueva red de coordinación
  async create(data: Partial<RedCordinacion>): Promise<RedCordinacion> {
    data.usuario_creacion = 1; // Temporalmente asignamos el ID de creación
    const nuevaRed = this.redCordinacionRepository.create(data);
    return this.redCordinacionRepository.save(nuevaRed);
  }

  // Obtener todas las redes de coordinación
  async findAll(): Promise<RedCordinacion[]> {
    return this.redCordinacionRepository.find();
  }

  // Obtener solo ID, nombre y numeración de las redes activas (estado = 1)
  async findActive(): Promise<Partial<RedCordinacion[]>> {
    return this.redCordinacionRepository.find({
      where: { estado: 1 },
      select: ['red_ID', 'nombre', 'numeracion'], // Solo devolver ID, nombre y numeración
    });
  }

  // Obtener una red por su ID
  async findOne(id: number): Promise<RedCordinacion> {
    return this.redCordinacionRepository.findOne({ where: { red_ID: id } });
  }

  // Actualizar una red de coordinación
  async update(
    id: number,
    data: Partial<RedCordinacion>,
  ): Promise<RedCordinacion> {
    data.fecha_modificacion = new Date();
    data.usuario_modificacion = 1; // Temporalmente asignamos el ID de modificación
    await this.redCordinacionRepository.update(id, data);
    return this.redCordinacionRepository.findOne({ where: { red_ID: id } });
  }

  // Eliminar una red (eliminación lógica)
  async delete(id: number): Promise<void> {
    await this.redCordinacionRepository.update(id, {
      estado: 0,
      fecha_modificacion: new Date(),
      usuario_modificacion: 1, // Temporalmente asignamos el ID de modificación
    });
  }
}
