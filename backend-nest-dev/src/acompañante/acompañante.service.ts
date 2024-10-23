import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Acompanante } from './acompañante.entity';


@Injectable()
export class DatosAcompananteService {
    constructor(
        @InjectRepository(Acompanante)
        private datosAcompananteRepository: Repository<Acompanante>,
    ) {}

    // Crear datos acompañan
    async createDatosAcompanante(data: Partial<Acompanante>, manager?: EntityManager): Promise<Acompanante> {
        const datosAcompanante = manager ? manager.create(Acompanante, data) : this.datosAcompananteRepository.create(data);
        return manager ? manager.save(datosAcompanante) : this.datosAcompananteRepository.save(datosAcompanante);
    }

    // Obtener todos los acompañantes
    async getAllDatosAcompanante(): Promise<Acompanante[]> {
        return this.datosAcompananteRepository.find();
    }

        // Obtener datos acompañantes por ID
    async getDatosAcompananteById(acompaniante_ID: number): Promise<Acompanante> {
        return this.datosAcompananteRepository.findOne({ where: { acompaniante_ID } });
    }
}