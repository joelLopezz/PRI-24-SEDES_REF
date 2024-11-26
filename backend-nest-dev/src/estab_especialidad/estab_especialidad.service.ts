import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstablecimientoSaludHasEspecialidad } from './estab_especialidad.entity';
import {AuthService} from '../Auth/auth.service';
import { Specialty } from '../specialty/specialty.entity';

@Injectable()
export class EstabEspecialidadService {
  constructor(
    @InjectRepository(EstablecimientoSaludHasEspecialidad)
    private readonly relacionRepository: Repository<EstablecimientoSaludHasEspecialidad>,
    private authService: AuthService,
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

  async deleteRelacion(id: number): Promise<void> {
    console.log(`Buscando relación con ID: ${id}`); // Log adicional
    const relacion = await this.relacionRepository.findOne({ where: { id } });

    if (!relacion) {
      throw new NotFoundException('Relación no encontrada');
    }

    console.log(`Eliminando relación con ID: ${id}`);
    await this.relacionRepository.remove(relacion);
  }


  //obtener especialidades por hospital
  async getEspecialidadesPorEstablecimiento(): Promise<Specialty[]> {
    // Obtener el usuario autenticado
    const currentUser = await this.authService.getCurrentUser();

    // Obtener el ID del establecimiento del usuario logueado
    // const establecimientoID = currentUser.establecimientoID;
    const establecimientoID = 1;
    // // Verificar que el establecimientoID sea válido
    // if (!establecimientoID) {
    //   throw new NotFoundException('No se pudo obtener el establecimiento del usuario.');
    // }

    // Buscar las especialidades asociadas a ese establecimiento
    const establecimientoSaludEspecialidades = await this.relacionRepository.find({
      where: { establecimiento_salud_idestablecimiento_ID: establecimientoID },
      relations: ['especialidad'], // Aseguramos de cargar la entidad de especialidad
    });

    // Verificar si existen especialidades asociadas
    if (establecimientoSaludEspecialidades.length === 0) {
      throw new NotFoundException('No se encontraron especialidades para este establecimiento.');
    }

    // Devolver las especialidades asociadas al establecimiento
    return establecimientoSaludEspecialidades.map(
      (establecimientoSaludEspecialidad) => establecimientoSaludEspecialidad.especialidad,
    );
  }

}
