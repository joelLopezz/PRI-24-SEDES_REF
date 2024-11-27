// src/registro/registro.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { PacienteService } from '../paciente/paciente.service';
import { ReferenciaService } from '../referencia/referencia.service';
import { CreatePacienteDto } from '../paciente/dto/create-paciente.dto';
import { CreateReferenciaDto } from '../referencia/dto/create-referencia.dto';
import { UpdatePacienteDto } from '../paciente/dto/update-paciente.dto';
import { UpdateReferenciaDto } from '../referencia/dto/update-referencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class RegistroService {
  constructor(
    private readonly pacienteService: PacienteService,
    private readonly referenciaService: ReferenciaService,
    private dataSource: DataSource,
  ) {}

  async createRegistro(
    createPacienteDto: CreatePacienteDto,
    createReferenciaDto: CreateReferenciaDto,
    userId: number,
  ) {
    // Iniciamos una transacción
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Validamos que el campo `nombres` esté presente
      if (!createPacienteDto.nombres) {
        throw new BadRequestException('El campo nombres es obligatorio para el paciente');
      }

      // Creamos el paciente
      const paciente = await this.pacienteService.create(createPacienteDto, userId);

      // Asignamos el ID del paciente a la referencia
      createReferenciaDto.paciente_paciente_ID = paciente.paciente_ID;

      // Creamos la referencia
      const referencia = await this.referenciaService.create(createReferenciaDto, userId);

      // Confirmamos la transacción
      await queryRunner.commitTransaction();

      return { paciente, referencia };
    } catch (error) {
      // Si hay error, revertimos la transacción
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Liberamos el queryRunner
      await queryRunner.release();
    }
  }

  async getRegistroById(id: number) {
    const referencia = await this.referenciaService.findOne(id);
    if (!referencia) {
      throw new BadRequestException('Referencia no encontrada');
    }
  
    // Incluimos los datos del paciente relacionados
    const paciente = await this.pacienteService.findOne(referencia.paciente_paciente_ID.paciente_ID);
  
    // Ajustamos la respuesta para que sea clara y estructurada
    return {
      paciente: {
        ...paciente,
      },
      referencia: {
        ...referencia,
      },
    };
  }
  

  async updateRegistro(
    id: number,
    updatePacienteDto: UpdatePacienteDto,
    updateReferenciaDto: UpdateReferenciaDto,
    userId: number,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
  
    try {
      // Encontramos la referencia
      const referencia = await this.referenciaService.findOne(id);
      if (!referencia) {
        throw new BadRequestException('Referencia no encontrada');
      }
  
      // Actualizamos los datos del paciente
      await this.pacienteService.update(
        referencia.paciente_paciente_ID.paciente_ID,
        updatePacienteDto,
        userId,
      );
  
      // Actualizamos los datos de la referencia
      const updatedReferencia = await this.referenciaService.update(
        id,
        updateReferenciaDto,
        userId,
      );
  
      // Confirmamos la transacción
      await queryRunner.commitTransaction();
  
      return {
        message: 'Registro actualizado exitosamente',
        paciente: updatePacienteDto,
        referencia: updatedReferencia,
      };
    } catch (error) {
      // Revertimos la transacción en caso de error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Liberamos el queryRunner
      await queryRunner.release();
    }
  }
  
  async deleteRegistro(id: number, userId: number) {
    const referencia = await this.referenciaService.findOne(id);
    if (!referencia) {
      throw new BadRequestException('Referencia no encontrada');
    }

    await this.pacienteService.softRemove(referencia.paciente_paciente_ID.paciente_ID, userId);
    return await this.referenciaService.softRemove(id, userId);
  }
}
