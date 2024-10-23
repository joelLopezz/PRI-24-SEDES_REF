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
  //prettier-ignore
  // Crear un nuevo establecimiento
  async create(data: Partial<EstablecimientoSalud>): Promise<EstablecimientoSalud> {
    // Asignamos temporalmente el ID del usuario de creación
    data.usuario_creacion = 1;
    const newEstablecimiento = this.establecimientoRepository.create(data);
    return this.establecimientoRepository.save(newEstablecimiento);
  }

  // Obtener todos los establecimientos
  async findAll(): Promise<EstablecimientoSalud[]> {
    return this.establecimientoRepository.find({
      relations: ['redCordinacion'], // Incluir la relación con RedCordinacion
    });
  }
  //prettier-ignore
  // Obtener un establecimiento por su ID
  async findOne(id: number): Promise<EstablecimientoSalud> {
    const establecimiento = await this.establecimientoRepository.findOne({
      where: { id },
      relations: ['redCordinacion'], // Incluir la relación con RedCordinacion
    });
    if (!establecimiento) {
      throw new NotFoundException(`Establecimiento con ID ${id} no encontrado`);
    }
    return establecimiento;
  }
  //prettier-ignore
  // Actualizar un establecimiento
  async update(id: number, data: Partial<EstablecimientoSalud>): Promise<EstablecimientoSalud> {
    // Actualizamos la fecha de modificación y asignamos el usuario que modifica
    data.fecha_modificacion = new Date();
    data.usuario_modificacion = 1; // Temporalmente 1
    await this.establecimientoRepository.update(id, data);
    return this.establecimientoRepository.findOne({ where: { id } });
  }

  // Eliminar un establecimiento (eliminación lógica)
  async delete(id: number): Promise<void> {
    await this.establecimientoRepository.update(id, {
      estado: 0,
      fecha_modificacion: new Date(),
      usuario_modificacion: 1, // Temporalmente 1
    });
  }
}