// src/tipo/tipo.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tipo } from './tipo.entity';

@Injectable()
export class TipoService {
  constructor(
    @InjectRepository(Tipo)
    private tipoRepository: Repository<Tipo>,
  ) {}

  // Obtener los tipos activos (solo id y nombre)
  async findActive(): Promise<Tipo[]> {
    return this.tipoRepository.find({
      where: { estado: 1 }, // Asegúrate de que "estado" sea un número y no un valor inválido
      select: ['tipo_ID', 'nombre'], // Solo devolvemos id y nombre para el select en la UI
    });
  }

  // Método adicional para obtener todos los tipos (si lo necesitas)
  async findAll(): Promise<Tipo[]> {
    return this.tipoRepository.find();
  }

  // Obtener un tipo por su ID
  async findOne(id: number): Promise<Tipo> {
    return this.tipoRepository.findOne({
      where: { tipo_ID: id },
    });
  }
}
