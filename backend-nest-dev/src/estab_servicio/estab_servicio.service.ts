import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstablecimientoSaludServicio } from './estab_servicio.entity';
import { Servicio } from '../servicio/servicio.entity';

@Injectable()
export class EstabServicioService {
  constructor(
    @InjectRepository(EstablecimientoSaludServicio)
    private readonly relacionRepository: Repository<EstablecimientoSaludServicio>,

    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>,
  ) {}

  // Crear una relación entre un establecimiento y un servicio
  async addServicio(
    establecimientoId: number,
    servicioId: number,
  ): Promise<EstablecimientoSaludServicio> {
    const nuevaRelacion = this.relacionRepository.create({
      establecimiento_salud_id: establecimientoId,
      servicio_id: servicioId,
    });
    return this.relacionRepository.save(nuevaRelacion);
  }

  // Crear múltiples relaciones entre un establecimiento y varios servicios
  async addMultipleServicios(
    serviciosData: { establecimiento_salud_id: number; servicio_id: number }[],
  ): Promise<EstablecimientoSaludServicio[]> {
    const nuevasRelaciones = serviciosData.map((data) =>
      this.relacionRepository.create(data),
    );
    return this.relacionRepository.save(nuevasRelaciones);
  }

  // Obtener todos los servicios asociados a un establecimiento específico
  async getServiciosPorEstablecimiento(
    establecimientoId: number,
  ): Promise<EstablecimientoSaludServicio[]> {
    return this.relacionRepository.find({
      where: { establecimiento_salud_id: establecimientoId },
      relations: ['servicio'],
    });
  }

  // Obtener servicios de una especialidad específica en un establecimiento
  async findServiciosByEstablecimientoAndEspecialidad(
    establecimientoId: number,
    especialidadId: number,
  ): Promise<any[]> {
    return this.relacionRepository
      .createQueryBuilder('relacion')
      .leftJoinAndSelect('relacion.servicio', 'servicio')
      .where('relacion.establecimiento_salud_id = :establecimientoId', {
        establecimientoId,
      })
      .andWhere('servicio.especialidad_ID = :especialidadId', {
        especialidadId,
      })
      .select([
        'relacion.id',
        'servicio.codigo',
        'servicio.nombre',
        'relacion.equipo_instrumental',
        'relacion.medicamentos_reactivos',
        'relacion.insumos',
      ])
      .getMany();
  }

  // Obtener los servicios disponibles para una especialidad que aún no están asociados al establecimiento
  async findAvailableServiciosByEspecialidad(
    establecimientoId: number,
    especialidadId: number,
  ): Promise<Servicio[]> {
    return this.servicioRepository
      .createQueryBuilder('servicio')
      .leftJoin(
        EstablecimientoSaludServicio,
        'relacion',
        'relacion.servicio_id = servicio.servicio_ID AND relacion.establecimiento_salud_id = :establecimientoId',
        { establecimientoId },
      )
      .where('servicio.especialidad_ID = :especialidadId', { especialidadId })
      .andWhere('relacion.id IS NULL') // Excluye los servicios ya asociados
      .select(['servicio.servicio_ID', 'servicio.codigo', 'servicio.nombre'])
      .getMany();
  }

  // Actualizar los atributos de un servicio para un establecimiento
  async updateServicioAttributes(
    relacionId: number,
    attributes: Partial<EstablecimientoSaludServicio>,
  ): Promise<EstablecimientoSaludServicio> {
    await this.relacionRepository.update(relacionId, attributes);
    return this.relacionRepository.findOne({
      where: { id: relacionId },
      relations: ['servicio'],
    });
  }
}
