import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Diagnosticos } from './diagnostico.entity';

@Injectable()
export class  DiagnosticosService {
    constructor(
        @InjectRepository(Diagnosticos)
        private  diagnosticosRepository: Repository<Diagnosticos>,

    ){}

    // Crear datos clínicos
    async createDiagnosticos(data: Partial<Diagnosticos>, manager?: EntityManager): Promise<Diagnosticos> {
        const diagnosticos = manager ? manager.create(Diagnosticos, data) : this.diagnosticosRepository.create(data);
        return manager ? manager.save(diagnosticos) : this.diagnosticosRepository.save(diagnosticos);
    }

    // Obtener todos los datos clínicos
    async getAllDiagnosticos(): Promise<Diagnosticos[]> {
        return this.diagnosticosRepository.find();
    }

    // Obtener datos clínicos por ID
    async getDiagnosticosById(diagnostico_ID: number): Promise<Diagnosticos> {
        return this.diagnosticosRepository.findOne({ where: { diagnostico_ID } });
    }
}
