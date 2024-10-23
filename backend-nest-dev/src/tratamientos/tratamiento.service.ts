import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Tratamientos } from './tratamiento.entity';


@Injectable()
export class TratamientoService {
    constructor(
        @InjectRepository(Tratamientos)
        private readonly tratamientoRepository: Repository<Tratamientos>,
    ) {}

    // Crear tratamiento
    async createTratamientos(data: Partial<Tratamientos>, manager?: EntityManager): Promise<Tratamientos> {
        const datosTratamientos = manager ? manager.create(Tratamientos, data) : this.tratamientoRepository.create(data);
        return manager ? manager.save(datosTratamientos) : this.tratamientoRepository.save(datosTratamientos);
    }

    // Obtener todos los tratamientos
    async getAllTratamientos(): Promise<Tratamientos[]> {
        return this.tratamientoRepository.find();
    }

     // Obtener los tratamientos
    async getDatosTratamientosById(tratamiento_ID: number): Promise<Tratamientos> {
        return this.tratamientoRepository.findOne({ where: { tratamiento_ID } });
    }

}