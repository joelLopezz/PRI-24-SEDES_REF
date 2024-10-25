import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Municipio } from './municipio.entity';

@Injectable()
export class MunicipioService {
  constructor(
    @InjectRepository(Municipio)
    private municipioRepository: Repository<Municipio>,
  ) {}

  // Crear un nuevo municipio
  async create(data: Partial<Municipio>): Promise<Municipio> {
    const newMunicipio = this.municipioRepository.create(data);
    return this.municipioRepository.save(newMunicipio);
  }

  // Obtener todos los municipios
  async findAll(): Promise<Municipio[]> {
    return this.municipioRepository.find();
  }

  // Obtener un municipio por su ID
  async findOne(id: number): Promise<Municipio> {
    const municipio = await this.municipioRepository.findOne({
      where: { municipio_ID: id }, // Aquí pasamos el id como una condición
    });
    if (!municipio) {
      throw new NotFoundException(`Municipio con ID ${id} no encontrado`);
    }
    return municipio;
  }

  // Actualizar un municipio
  async update(id: number, data: Partial<Municipio>): Promise<Municipio> {
    await this.municipioRepository.update(id, data);
    return this.findOne(id);
  }

  // Eliminar un municipio (eliminación lógica)
  async delete(id: number): Promise<void> {
    await this.municipioRepository.update(id, {
      estado: 0,
      fecha_modificacion: new Date(),
    });
  }
}
