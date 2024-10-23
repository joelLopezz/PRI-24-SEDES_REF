import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Paciente } from './paciente.entity';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private pacienteRepository: Repository<Paciente>,
  ) {}

  // Crear un paciente
  async createPaciente(data: Partial<Paciente>, manager?: EntityManager): Promise<Paciente> {
    const paciente = manager ? manager.create(Paciente, data) : this.pacienteRepository.create(data);
    return manager ? manager.save(paciente) : this.pacienteRepository.save(paciente);
  }

  // Obtener todos los pacientes
  async getAllPacientes(): Promise<Paciente[]> {
    return this.pacienteRepository.find();
  }

  // Obtener un paciente por ID
  async getPacienteById(ID_Paciente: number): Promise<Paciente> {
    return this.pacienteRepository.findOne({ where: { ID_Paciente } });
  }

  // Actualizar un paciente
  // async updatePaciente(ID_Paciente: number, data: Partial<Paciente>, manager?: EntityManager): Promise<Paciente> {
  //   await (manager ? manager.update(Paciente, ID_Paciente, data) : this.pacienteRepository.update(ID_Paciente, data));
  //   return this.getPacienteById(ID_Paciente);
  // }

  // Eliminar un paciente (lógica o física)
  // async deletePaciente(ID_Paciente: number): Promise<void> {
  //   await this.pacienteRepository.delete(ID_Paciente);
  // }
}
