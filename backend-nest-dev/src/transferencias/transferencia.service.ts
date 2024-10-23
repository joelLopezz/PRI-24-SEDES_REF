import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Transferencia } from './transferencia.entity';

@Injectable()
export class TransferenciasService {
  constructor(
    @InjectRepository(Transferencia)
    private transferenciaRepository: Repository<Transferencia>,
  ) {}

  // Crear una transferencia
  async createTransferencia(data: Partial<Transferencia>, manager?: EntityManager): Promise<Transferencia> {
    const transferencia = manager ? manager.create(Transferencia, data) : this.transferenciaRepository.create(data);
    return manager ? manager.save(transferencia) : this.transferenciaRepository.save(transferencia);
  }

//   async createTransferencia(transferenciaData: Partial<Transferencia>, manager: EntityManager) {
//     const transferencia = manager.create(Transferencia, transferenciaData);
//     return await manager.save(transferencia);
// }


  // Obtener todas las transferencias
  async getAllTransferencias(): Promise<Transferencia[]> {
    return this.transferenciaRepository.find();
  }

  // Obtener una transferencia por ID
  async getTransferenciaById(transferencia_ID: number): Promise<Transferencia> {
    return this.transferenciaRepository.findOne({ where: { transferencia_ID } });
  }

  // Actualizar una transferencia
  // async updateTransferencia(ID_Transferencia: number, data: Partial<Transferencia>, manager?: EntityManager): Promise<Transferencia> {
  //   await (manager ? manager.update(Transferencia, ID_Transferencia, data) : this.transferenciaRepository.update(ID_Transferencia, data));
  //   return this.getTransferenciaById(ID_Transferencia);
  // }

  // Eliminar una transferencia
//   async deleteTransferencia(ID_Transferencia: number): Promise<void> {
//     await this.transferenciaRepository.delete(ID_Transferencia);
//   }
}
