/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstablecimientoSalud } from './establecimiento.entity';

@Injectable()
export class EstablecimientoService {
  constructor(
    @InjectRepository(EstablecimientoSalud)
    private establecimientoRepository: Repository<EstablecimientoSalud>,
  ) {}

  // Crear un nuevo establecimiento
  async create(
    data: Partial<EstablecimientoSalud>,
    usuarioID: number,
  ): Promise<EstablecimientoSalud> {
    data.usuario_creacion = usuarioID; // Asigna el usuario_ID recibido
    const newEstablecimiento = this.establecimientoRepository.create(data);
    return this.establecimientoRepository.save(newEstablecimiento);
  }

  // Obtener todos los establecimientos
  async findAll(): Promise<EstablecimientoSalud[]> {
    return this.establecimientoRepository.find({
      where: { estado: 1 },
      relations: ['redCordinacion', 'municipio'], // Incluir la relación con RedCordinacion y Municipio
    });
  }
  // Método para obtener todos los establecimientos de salud con ID y nombre
  // Método para obtener todos los establecimientos de salud con ID y nombre
  async obtenerNombresEstablecimientos(): Promise<{ id: number; nombre: string }[]> {
    return await this.establecimientoRepository.find({ 
      select: ['id', 'nombre'], // Selecciona los campos 'id' y 'nombre'
      where: { estado: 1 }, // Opcional: filtra por estado activo si es necesario
    });
  }


  // Obtener un establecimiento por su ID
  async findOne(id: number): Promise<EstablecimientoSalud> {
    const establecimiento = await this.establecimientoRepository.findOne({
      where: { id },
      relations: ['redCordinacion', 'municipio'], // Incluir la relación con RedCordinacion y Municipio
    });
    if (!establecimiento) {
      throw new NotFoundException(`Establecimiento con ID ${id} no encontrado`);
    }
    return establecimiento;
  }

  // Actualizar un establecimiento
  async update(
    id: number,
    data: Partial<EstablecimientoSalud>,
    usuarioID: number,
  ): Promise<EstablecimientoSalud> {
    data.fecha_modificacion = new Date();
    data.usuario_modificacion = usuarioID; // Asigna el usuario_ID recibido
    await this.establecimientoRepository.update(id, data);
    return this.establecimientoRepository.findOne({ where: { id } });
  }

  // Eliminar un establecimiento (eliminación lógica)
  // En el servicio de establecimiento
  async delete(id: number, usuario_modificacion: number): Promise<void> {
    await this.establecimientoRepository.update(id, {
      estado: 0,
      fecha_modificacion: new Date(),
      usuario_modificacion,
    });
  }

}

