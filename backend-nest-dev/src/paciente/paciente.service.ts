// src/paciente/paciente.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './paciente.entity';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private pacienteRepository: Repository<Paciente>,
  ) {}

  async findAll(): Promise<Paciente[]> {
    return await this.pacienteRepository.find({ where: { estado: 1 } });
  }

  async findOne(id: number): Promise<Paciente> {
    return await this.pacienteRepository.findOne({ where: { paciente_ID: id, estado: 1 } });
  }

  async create(createPacienteDto: CreatePacienteDto, userId: number): Promise<Paciente> {
    const nuevoPaciente = this.pacienteRepository.create({
      ...createPacienteDto,
      usuario_creacion: userId,
    });
    return await this.pacienteRepository.save(nuevoPaciente);
  }

  async update(id: number, updatePacienteDto: UpdatePacienteDto, userId: number): Promise<Paciente> {
    const paciente = await this.findOne(id);
    Object.assign(paciente, updatePacienteDto, { usuario_modificacion: userId });
    return await this.pacienteRepository.save(paciente);
  }

  async softRemove(id: number, userId: number): Promise<Paciente> {
    const paciente = await this.findOne(id);
    paciente.estado = 0;
    paciente.usuario_modificacion = userId;
    return await this.pacienteRepository.save(paciente);
  }
}
