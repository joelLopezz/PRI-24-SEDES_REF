import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { DatosClinicos } from './datoclinico.entity';

@Injectable()
export class DatosClinicosService {
  constructor(
    @InjectRepository(DatosClinicos)
    private datosClinicosRepository: Repository<DatosClinicos>,
  ) {}

  // Crear datos clínicos
  async createDatosClinicos(data: Partial<DatosClinicos>, manager?: EntityManager): Promise<DatosClinicos> {
    const datosClinicos = manager ? manager.create(DatosClinicos, data) : this.datosClinicosRepository.create(data);
    return manager ? manager.save(datosClinicos) : this.datosClinicosRepository.save(datosClinicos);
  }

  // Obtener todos los datos clínicos
  async getAllDatosClinicos(): Promise<DatosClinicos[]> {
    return this.datosClinicosRepository.find();
  }

  // Obtener datos clínicos por ID
  async getDatosClinicosById(dato_clinico_ID: number): Promise<DatosClinicos> {
    return this.datosClinicosRepository.findOne({ where: { dato_clinico_ID } });
  }

  // Actualizar datos clínicos
  // async updateDatosClinicos(ID_DatosClinicos: number, data: Partial<DatosClinicos>, manager?: EntityManager): Promise<DatosClinicos> {
  //   await (manager ? manager.update(DatosClinicos, ID_DatosClinicos, data) : this.datosClinicosRepository.update(ID_DatosClinicos, data));
  //   return this.getDatosClinicosById(ID_DatosClinicos);
  // }

  // Eliminar datos clínicos
  async deleteDatosClinicos(ID_DatosClinicos: number): Promise<void> {
    await this.datosClinicosRepository.delete(ID_DatosClinicos);
  }
}
