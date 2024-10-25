import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstablecimientoSaludHasEspecialidad } from './estab_especialidad.entity';

@Injectable()
export class EstabEspecialidadService {
  constructor(
    @InjectRepository(EstablecimientoSaludHasEspecialidad)
    private readonly relacionRepository: Repository<EstablecimientoSaludHasEspecialidad>,
  ) {}

  // Crear una nueva relación entre un establecimiento y una especialidad
  async create(
    establecimientoId: number,
    especialidadId: number,
  ): Promise<EstablecimientoSaludHasEspecialidad> {
    const nuevaRelacion = this.relacionRepository.create({
      establecimiento_salud_idestablecimiento_ID: establecimientoId,
      especialidad_ID: especialidadId,
    });
    return this.relacionRepository.save(nuevaRelacion);
  }

  // Crear múltiples relaciones entre un establecimiento y especialidades
  async createMultiple(
    establecimientoId: number,
    especialidadIds: number[],
  ): Promise<EstablecimientoSaludHasEspecialidad[]> {
    const nuevasRelaciones = especialidadIds.map((especialidadId) =>
      this.relacionRepository.create({
        establecimiento_salud_idestablecimiento_ID: establecimientoId,
        especialidad_ID: especialidadId,
      }),
    );
    return this.relacionRepository.save(nuevasRelaciones);
  }

  // Obtener todas las especialidades de un establecimiento
  // Obtener todas las especialidades de un establecimiento
  async findEspecialidadesByEstablecimiento(
    establecimientoId: number,
  ): Promise<any[]> {
    return this.relacionRepository
      .createQueryBuilder('relacion')
      .leftJoinAndSelect('relacion.especialidad', 'especialidad')
      .select(['relacion.id', 'especialidad.nombre'])
      .where(
        'relacion.establecimiento_salud_idestablecimiento_ID = :establecimientoId',
        { establecimientoId },
      )
      .getMany();
  }

  // Eliminar una relación
  async deleteRelacion(
    establecimientoId: number,
    especialidadId: number,
  ): Promise<void> {
    const relacion = await this.relacionRepository.findOne({
      where: {
        establecimiento_salud_idestablecimiento_ID: establecimientoId,
        especialidad_ID: especialidadId,
      },
    });

    if (!relacion) {
      throw new NotFoundException('Relación no encontrada');
    }

    await this.relacionRepository.remove(relacion);
  }
}
