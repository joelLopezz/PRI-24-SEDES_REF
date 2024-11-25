/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
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
  async create(data: Partial<RedCordinacion> & { usuario_ID: number }): Promise<RedCordinacion> {
    // Convertir el nombre a mayúsculas para consistencia
    data.nombre = data.nombre.toUpperCase();

    // Verificar si ya existe una red con el mismo nombre
    const existingRed = await this.redCordinacionRepository.findOne({
      where: { nombre: data.nombre },
    });
    if (existingRed) {
      throw new BadRequestException(`Ya existe una red de coordinación con el nombre ${data.nombre}`);
    }

    const nuevaRed = this.redCordinacionRepository.create({
      ...data,
      usuario_creacion: data.usuario_ID,
    });
    return this.redCordinacionRepository.save(nuevaRed);
  }
  // Obtener todas las redes de coordinación activas
  async findAll(): Promise<RedCordinacion[]> {
    return this.redCordinacionRepository.find({
      where: { estado: 1 }, // Solo traer redes con estado = 1
    });
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
  // Actualizar una red de coordinación en el servicio
  async update(
    id: number,
    data: Partial<RedCordinacion> & { usuario_modificacion: number },
  ): Promise<RedCordinacion> {
    await this.redCordinacionRepository.update(id, {
      ...data,
      fecha_modificacion: new Date(),
      usuario_modificacion: data.usuario_modificacion,
    });
    return this.redCordinacionRepository.findOne({ where: { red_ID: id } });
  }


  // Eliminar una red (eliminación lógica)
  async delete(id: number, usuario_ID: number): Promise<void> {
    await this.redCordinacionRepository.update(id, {
      estado: 0,
      fecha_modificacion: new Date(),
      usuario_modificacion: usuario_ID,
    });
  }
}
