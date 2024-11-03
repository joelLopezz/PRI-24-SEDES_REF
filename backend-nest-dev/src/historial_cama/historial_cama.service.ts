import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoriaCama } from '../historial_cama/historial_cama.entity';
import { Cama } from '../cama/cama.entity';

@Injectable()
export class HistoriaCamaService {
  constructor(
    @InjectRepository(HistoriaCama)
    private readonly historiaCamaRepository: Repository<HistoriaCama>,

    @InjectRepository(Cama)
    private readonly camaRepository: Repository<Cama>,
  ) {}



  // Método para reinserción de datos en HistoriaCama usando solo historia_ID
  async reinsertarDatosHistoria(historia_ID: number): Promise<HistoriaCama> {
    // Obtener el registro de HistoriaCama por historia_ID con las relaciones necesarias
    const historiaExistente = await this.historiaCamaRepository
      .createQueryBuilder('historiaCama')
      .leftJoinAndSelect('historiaCama.cama', 'cama')
      .leftJoinAndSelect('cama.especialidad', 'especialidad')
      .where('historiaCama.historia_ID = :historia_ID', { historia_ID })
      .getOne();

    // Validar que el registro exista
    if (!historiaExistente) {
      throw new NotFoundException(`No se encontró ningún historial con ID ${historia_ID}`);
    }

    const { cama } = historiaExistente;
    const nombreEspecialidad = cama.especialidad.nombre;

    // Obtener los datos agregados para la especialidad usando cama_ID y el nombre de la especialidad
    const especialidadData = await this.historiaCamaRepository
      .createQueryBuilder('historiaCama')
      .leftJoin('historiaCama.cama', 'cama')
      .leftJoin('cama.especialidad', 'especialidad')
      .where('cama.cama_ID = :cama_ID', { cama_ID: cama.cama_ID })
      .andWhere('especialidad.nombre = :nombreEspecialidad', { nombreEspecialidad })
      .select([
        'SUM(historiaCama.instalada) AS instaladas',
        'SUM(historiaCama.ofertada) AS ofertadas',
        'SUM(historiaCama.disponible) AS disponibles',
        'SUM(historiaCama.ocupada) AS ocupadas',
        'SUM(historiaCama.alta) AS alta',
      ])
      .getRawOne();

    // Validar que se hayan encontrado datos
    if (!especialidadData) {
      throw new NotFoundException(`No se encontraron datos para la especialidad "${nombreEspecialidad}" con cama_ID ${cama.cama_ID}`);
    }

    // Crear y preparar el nuevo registro en HistoriaCama
    const nuevoRegistro = this.historiaCamaRepository.create({
      cama,
      instalada: Number(especialidadData.instaladas),
      ofertada: Number(especialidadData.ofertadas),
      disponible: Number(especialidadData.disponibles),
      ocupada: Number(especialidadData.ocupadas),
      alta: Number(especialidadData.alta),
      usuario_modificacion: 0, // Cambia esto según el usuario real
      es_actual: true,
    });

    // Guardar el nuevo registro en la base de datos
    return await this.historiaCamaRepository.save(nuevoRegistro);
  }  





  // // Método para reinserción de datos en HistoriaCama usando solo historia_ID
  // async reinsertarDatosHistoria(historia_ID: number): Promise<HistoriaCama> {
  //   // Obtener el registro de HistoriaCama por historia_ID para obtener el cama_ID asociado
  //   const historiaExistente = await this.historiaCamaRepository.findOne({
  //     where: { historia_ID },
  //     relations: ['cama', 'cama.especialidad'],
  //   });

  //   // Validar que el registro exista
  //   if (!historiaExistente) {
  //     throw new NotFoundException(`No se encontró ningún historial con ID ${historia_ID}`);
  //   }

  //   // Obtener el nombre de la especialidad y los datos agregados de la última entrada de la especialidad en HistoriaCama
  //   const cama_ID = historiaExistente.cama.cama_ID;
  //   const nombreEspecialidad = historiaExistente.cama.especialidad.nombre;

  //   // Obtener los datos de la especialidad usando el cama_ID y sumar los valores de los atributos
  //   const especialidadData = await this.historiaCamaRepository
  //     .createQueryBuilder('historiaCama')
  //     .leftJoin('historiaCama.cama', 'cama')
  //     .leftJoin('cama.especialidad', 'especialidad')
  //     .where('cama.cama_ID = :cama_ID', { cama_ID })
  //     .andWhere('especialidad.nombre = :nombreEspecialidad', { nombreEspecialidad })
  //     .select([
  //       'SUM(historiaCama.instalada) AS instaladas',
  //       'SUM(historiaCama.ofertada) AS ofertadas',
  //       'SUM(historiaCama.disponible) AS disponibles',
  //       'SUM(historiaCama.ocupada) AS ocupadas',
  //       'SUM(historiaCama.alta) AS alta',
  //     ])
  //     .getRawOne();

  //   // Validar que se hayan encontrado datos
  //   if (!especialidadData) {
  //     throw new NotFoundException(`No se encontraron datos para la especialidad "${nombreEspecialidad}" con cama_ID ${cama_ID}`);
  //   }

  //   // Crear un nuevo registro en HistoriaCama con los datos obtenidos
  //   const nuevoRegistro = new HistoriaCama();
  //   nuevoRegistro.cama = { cama_ID } as Cama; // Asociar al historial usando cama_ID
  //   nuevoRegistro.instalada = parseInt(especialidadData.instaladas, 10);
  //   nuevoRegistro.ofertada = parseInt(especialidadData.ofertadas, 10);
  //   nuevoRegistro.disponible = parseInt(especialidadData.disponibles, 10);
  //   nuevoRegistro.ocupada = parseInt(especialidadData.ocupadas, 10);
  //   nuevoRegistro.alta = parseInt(especialidadData.alta, 10);
  //   nuevoRegistro.usuario_modificacion = 0; // Cambiar según el usuario actual
  //   nuevoRegistro.es_actual = true;

  //   // Guardar el nuevo registro en la base de datos
  //   return await this.historiaCamaRepository.save(nuevoRegistro);
  // }
}
