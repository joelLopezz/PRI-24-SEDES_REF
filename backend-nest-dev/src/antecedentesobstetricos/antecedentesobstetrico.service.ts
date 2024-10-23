import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { AntecedenteObstetrico } from './antecedentesobstetrico.entity';

@Injectable()
export class AntecedenteObstetricoService {
  constructor(
    @InjectRepository(AntecedenteObstetrico)
    private antecedenteobstetricoRepository: Repository<AntecedenteObstetrico>,
  ) {}

  //Registro
  async createAntecedenteObstetrico(data: Partial<AntecedenteObstetrico>, manager?: EntityManager): Promise<AntecedenteObstetrico> {
    const antecedenteobstetrico = manager ? manager.create(AntecedenteObstetrico, data) : this.antecedenteobstetricoRepository.create(data);
    return manager ? manager.save(antecedenteobstetrico) : this.antecedenteobstetricoRepository.save(antecedenteobstetrico);
  }

  // Obtener todos los datos clínicos
  async getAllDatosClinicos(): Promise<AntecedenteObstetrico[]> {
    return this.antecedenteobstetricoRepository.find();
  }

  // Obtener datos clínicos por ID
  async getDatosClinicosById(antecedente_obstetrico: number): Promise<AntecedenteObstetrico> {
    return this.antecedenteobstetricoRepository.findOne({ where: { antecedente_obstetrico } });
  }
}

