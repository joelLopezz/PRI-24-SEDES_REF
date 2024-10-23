import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cama } from './cama.entity';

@Injectable()
export class CamaService {
  constructor(
    @InjectRepository(Cama)
    private readonly camaRepository: Repository<Cama>,
  ) {}

  // Obtener todas las camas
  async findAll(): Promise<Cama[]> {
    return await this.camaRepository.find({
      relations: ['establecimientoSalud', 'especialidad', 'servicio'], // Opcional si quieres cargar las relaciones
    });
  }

  // Obtener una cama por su número
  async findOne(numero: number): Promise<Cama> {
    return await this.camaRepository.findOne({
      where: { numero },
      relations: ['establecimientoSalud', 'especialidad', 'servicio'], // Opcional si quieres cargar las relaciones
    });
  }
}
