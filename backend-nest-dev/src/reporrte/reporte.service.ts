/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoriaCama } from '../historial_cama/historial_cama.entity';
import { Cama } from '../cama/cama.entity';
import { Specialty } from '../specialty/specialty.entity';
import { EstablecimientoSalud } from '../establecimiento/establecimiento.entity';

@Injectable()
export class ReporteService {
  constructor(
    @InjectRepository(HistoriaCama)
    private readonly historiaCamaRepository: Repository<HistoriaCama>,
    @InjectRepository(Cama)
    private readonly camaRepository: Repository<Cama>,
    @InjectRepository(Specialty)
    private readonly especialidadRepository: Repository<Specialty>,
    @InjectRepository(EstablecimientoSalud)
    private readonly establecimientoRepository: Repository<EstablecimientoSalud>,
  ) {}

  async generarReportePorHospital(hospitalId: number) {
    // Lógica para obtener el reporte
    const reporte = await this.historiaCamaRepository
      .createQueryBuilder('historiaCama')
      .leftJoin('historiaCama.cama', 'cama')
      .leftJoin('cama.especialidad', 'especialidad')
      .leftJoin('cama.establecimientoSalud', 'establecimiento')
      .where('establecimiento.idestablecimiento_ID = :hospitalId', { hospitalId })
      .andWhere('historiaCama.es_actual = :esActual', { esActual: true })
      .select([
        'especialidad.nombre AS especialidad',
        'SUM(historiaCama.instalada) AS inscritas',
        'SUM(historiaCama.ofertada) AS ofertadas',
        'SUM(historiaCama.disponible) AS disponibles',
        'SUM(historiaCama.ocupada) AS ocupadas',
        'SUM(historiaCama.alta) AS altas',
        'MAX(historiaCama.fecha_modificacion) AS ultima_modificacion',
      ])
      .groupBy('especialidad.especialidad_ID')
      .orderBy('especialidad.nombre', 'ASC')
      .getRawMany();

    return reporte.map((r) => ({
      especialidad: r.especialidad,
      inscritas: parseInt(r.inscritas, 10),
      ofertadas: parseInt(r.ofertadas, 10),
      disponibles: parseInt(r.disponibles, 10),
      ocupadas: parseInt(r.ocupadas, 10),
      altas: parseInt(r.altas, 10),
      ultima_modificacion: r.ultima_modificacion,
    }));
  }
}
