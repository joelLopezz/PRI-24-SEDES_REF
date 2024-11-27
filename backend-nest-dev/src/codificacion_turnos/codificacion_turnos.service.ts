import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCodificacionTurnoDto } from './dto/create-codificacion_turno.dto';
import { UpdateCodificacionTurnoDto } from './dto/update-codificacion_turno.dto';
import { CodificacionTurno } from './codificacion_turno.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Specialty } from '../specialty/specialty.entity';
import { AuthService } from '../Auth/auth.service';
import {EstablecimientoSalud} from '../establecimiento/establecimiento.entity';

@Injectable()
export class CodificacionTurnosService {

  constructor(
    @InjectRepository(CodificacionTurno)
    private codificacionTurnoRepository: Repository<CodificacionTurno>,
    private authService: AuthService,
  ) {}

  async findFiltered(especialidadId: number, year: number, month: number, hospital: number): Promise<CodificacionTurno[]> {
    try {
      return await this.codificacionTurnoRepository.find({
        where: {
          especialidad: { id: especialidadId },
          fecha: Between(
            new Date(year, month - 1, 1),
            new Date(year, month, 0)
          ),
          establecimientoSalud: { id: hospital},
        },
      });
    } catch (error) {
      console.error('Error al filtrar codificaciones de turno:', error);
      throw new InternalServerErrorException('Error al filtrar codificaciones de turno.');
    }
  }

// Crear múltiples codificaciones de turnos
async createMultiple(createCodificacionTurnoDtos: CreateCodificacionTurnoDto[]): Promise<CodificacionTurno[]> {
  try {
    const nuevasCodificaciones = await Promise.all(createCodificacionTurnoDtos.map(async (dto) => {
      // Crear la codificación de turno desde el DTO
      const codificacionTurno = this.codificacionTurnoRepository.create(dto);
      const currentUser = this.authService.getCurrentUser();
      const establecimientoSaludId = currentUser.establecimientoID;

      // Asignar el establecimiento de salud
      const establecimientoSalud = await this.codificacionTurnoRepository.manager.findOne(EstablecimientoSalud, {
        where: { id: establecimientoSaludId },
      });

      if (!establecimientoSalud) {
        throw new NotFoundException(`El establecimiento de salud con ID ${establecimientoSaludId} no fue encontrado`);
      }

      codificacionTurno.establecimientoSalud = establecimientoSalud;

      // Verificar si `especialidad_especialidad_ID` está presente en el DTO para cargar la relación
      if (dto.especialidad_especialidad_ID) {
        console.log('Buscando Especialidad con ID:', dto.especialidad_especialidad_ID);
        const especialidad = await this.codificacionTurnoRepository.manager.findOne(Specialty, {
          where: { id: dto.especialidad_especialidad_ID },
        });
        if (!especialidad) {
          throw new NotFoundException(`La especialidad con ID ${dto.especialidad_especialidad_ID} no fue encontrada`);
        }
        // Asignar la especialidad al nuevo registro de codificación de turno
        codificacionTurno.especialidad = especialidad;
      }

      return codificacionTurno;
    }));

    // Guardar todas las nuevas codificaciones de turnos
    return await this.codificacionTurnoRepository.save(nuevasCodificaciones);
  } catch (error) {
    console.error('Error al crear múltiples codificaciones de turnos:', error);
    throw new InternalServerErrorException('Error al crear múltiples codificaciones de turnos.');
  }
}


// Actualizar múltiples codificaciones de turnos
async updateMultipleCodificacionTurnos(
  updateDtos: { codificacion_turnos_id: number; Turno?: string; Sigla?: string; Hora_Inicio?: string; Hora_Fin?: string; Carga_Horaria?: string }[]
): Promise<CodificacionTurno[]> {
  try {
    // Mapear los DTOs para obtener una lista de promesas de actualización de cada codificación
    const codificacionesActualizadas = await Promise.all(updateDtos.map(async (dto) => {
      console.log('Actualizando codificación con ID:', dto.codificacion_turnos_id);

      // Buscar la codificación por su ID
      const codificacion = await this.codificacionTurnoRepository.findOne({ where: { codificacion_turnos_id: dto.codificacion_turnos_id } });
      if (!codificacion) {
        throw new NotFoundException(`La codificación con ID ${dto.codificacion_turnos_id} no fue encontrada`);
      }

      // Actualizar los campos según el DTO
      if (dto.Turno !== undefined) {
        codificacion.Turno = dto.Turno;
      }
      if (dto.Sigla !== undefined) {
        codificacion.Sigla = dto.Sigla;
      }
      if (dto.Hora_Inicio !== undefined) {
        codificacion.Hora_Inicio = dto.Hora_Inicio;
      }
      if (dto.Hora_Fin !== undefined) {
        codificacion.Hora_Fin = dto.Hora_Fin;
      }
      if (dto.Carga_Horaria !== undefined) {
        codificacion.Carga_Horaria = dto.Carga_Horaria;
      }

      // Guardar los cambios
      return await this.codificacionTurnoRepository.save(codificacion);
    }));

    console.log('Todas las codificaciones fueron actualizadas con éxito');
    return codificacionesActualizadas;
  } catch (error) {
    console.error('Error al actualizar múltiples codificaciones de turnos:', error);
    throw new InternalServerErrorException('Error al actualizar múltiples codificaciones de turnos.');
  }
}

async findAll(): Promise<CodificacionTurno[]> {
  return this.codificacionTurnoRepository.find();
}

  create(createCodificacionTurnoDto: CreateCodificacionTurnoDto) {
    return 'This action adds a new codificacionTurno';
  }

  findOne(id: number) {
    return `This action returns a #${id} codificacionTurno`;
  }

  update(id: number, updateCodificacionTurnoDto: UpdateCodificacionTurnoDto) {
    return `This action updates a #${id} codificacionTurno`;
  }

  remove(id: number) {
    return `This action removes a #${id} codificacionTurno`;
  }
}
