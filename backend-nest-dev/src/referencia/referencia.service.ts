// src/referencia/referencia.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Referencia } from './referencia.entity';
import { CreateReferenciaDto } from './dto/create-referencia.dto';
import { UpdateReferenciaDto } from './dto/update-referencia.dto';
import { Paciente } from '../paciente/paciente.entity';

@Injectable()
export class ReferenciaService {
  constructor(
    @InjectRepository(Referencia)
    private readonly referenciaRepository: Repository<Referencia>,
  ) {}

  async create(createReferenciaDto: CreateReferenciaDto, userId: number): Promise<Referencia> {
    const newReferencia = this.referenciaRepository.create({
      ...createReferenciaDto,
      usuario_creacion: userId,
      paciente_paciente_ID: { paciente_ID: createReferenciaDto.paciente_paciente_ID } as Paciente, // Definimos la relación correctamente
    });

    return await this.referenciaRepository.save(newReferencia);
  }

  private cleanNullFields(dto: any): any {
    return Object.fromEntries(
      Object.entries(dto).map(([key, value]) => [key, value === '' ? null : value]),
    );
  }

  async findOne(id: number): Promise<Referencia> {
    const referencia = await this.referenciaRepository.findOne({
      where: { referencia_ID: id },
      relations: ['paciente_paciente_ID'], // Incluimos la relación si es necesario
    });

    if (!referencia) {
      throw new NotFoundException(`Referencia con ID ${id} no encontrada`);
    }

    return referencia;
  }
  
  async findAll(): Promise<Referencia[]> {
    return await this.referenciaRepository.find({
      where: { estado: 1 }, // Solo obtener referencias activas
      relations: ['paciente_paciente_ID'], // Incluye la relación con el paciente
    });
  }
  
  async findByEstado(estado: number): Promise<Referencia[]> {
    return this.referenciaRepository.find({ where: { estado } });
  }

  async update(id: number, updateReferenciaDto: UpdateReferenciaDto, userId: number): Promise<Referencia> {
    const referencia = await this.findOne(id);

    const updatedReferencia = this.referenciaRepository.merge(referencia, {
      ...updateReferenciaDto,
      usuario_modificacion: userId,
      paciente_paciente_ID: { paciente_ID: updateReferenciaDto.paciente_paciente_ID } as Paciente, // Actualizamos la relación correctamente
    });

    return await this.referenciaRepository.save(updatedReferencia);
  }

  async softRemove(id: number, userId: number): Promise<Referencia> {
    const referencia = await this.findOne(id);
    referencia.estado = 0; // Cambiamos el estado a 0 para eliminación lógica
    referencia.usuario_modificacion = userId;
    referencia.fecha_modificacion = new Date();
    return await this.referenciaRepository.save(referencia);
  }
}
