/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cama } from '../cama/cama.entity';
import { Specialty } from '../specialty/specialty.entity';
import { Servicio } from '../servicio/servico.entity';
import {EstablecimientoSalud} from '../establecimiento/establecimiento.entity';

@Injectable()
export class CamaService {
  constructor(
    @InjectRepository(Cama)
    private readonly camaRepository: Repository<Cama>,

    @InjectRepository(Specialty)
    private readonly especialidadRepository: Repository<Specialty>,

    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>,

    @InjectRepository(EstablecimientoSalud)
    private readonly establecimientoRepository: Repository<EstablecimientoSalud>,
  ) {}

  async getEspecialidadesPorHospital(): Promise<any[]> {
    const hospital_id = 1; // ID fijo del hospital para el filtro
    const especialidades = await this.especialidadRepository
      .createQueryBuilder('especialidad')
      .leftJoin('especialidad.camas', 'cama')
      .leftJoin('cama.historial', 'historiaCama')
      .where('cama.establecimiento_salud_ID = :hospital_id', { hospital_id })
      .andWhere('historiaCama.es_actual = :es_actual', { es_actual: 1 }) // Condición para es_actual = 1
      .select([
        'especialidad.nombre AS nombre',
        'historiaCama.historia_ID AS historia_ID', // Añadimos el historia_ID
        'SUM(historiaCama.instalada) AS instaladas',
        'SUM(historiaCama.ofertada) AS ofertadas',
        'SUM(historiaCama.disponible) AS disponibles',
        'SUM(historiaCama.ocupada) AS ocupadas',
        'SUM(historiaCama.alta) AS alta',
      ])
      .groupBy('especialidad.especialidad_ID, historiaCama.historia_ID')
      .getRawMany();
    // Convertimos los valores de las sumas a enteros
    return especialidades.map((especialidad) => ({
      nombre: especialidad.nombre,
      historia_ID: parseInt(especialidad.historia_ID, 10), // Añadir historia_ID al resultado
      instaladas: parseInt(especialidad.instaladas, 10),
      ofertadas: parseInt(especialidad.ofertadas, 10),
      disponibles: parseInt(especialidad.disponibles, 10),
      ocupadas: parseInt(especialidad.ocupadas, 10),
      alta: parseInt(especialidad.alta, 10),
    }));
  }
  


  // Método para obtener especialidades    ======> nada que  wer xd
  async findAllEspecialidades(): Promise<{ especialidad_ID: number, nombre: string }[]> {
    return await this.especialidadRepository
      .createQueryBuilder('especialidad')
      .select(['especialidad.especialidad_ID', 'especialidad.nombre'])
      .getRawMany();
  }

  // Método para obtener servicios
  async findAllServicios(): Promise<{ servicio_ID: number, nombre: string }[]> {
    return await this.servicioRepository
      .createQueryBuilder('servicio')
      .select(['servicio.servicio_ID', 'servicio.nombre'])
      .getRawMany();
  }
}











// import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Cama } from '../cama/cama.entity';
// import { Especialidad } from '../especiaidad/especialidad.entity';
// import  { Servicio } from '../servicio/servico.entity';



// @Injectable()
// export class CamaService {
//   constructor(
//     @InjectRepository(Cama)
//     private readonly camaRepository: Repository<Cama>,

//     @InjectRepository(Especialidad)
//     private readonly especialidadRepository :  Repository<Especialidad>,

//     @InjectRepository(Servicio)
//     private readonly servicioRepository :  Repository<Servicio>,


//   ) {}

//   async create(camaData: Partial<Cama>): Promise<Cama> {
//     // Creación de la nueva cama
//     try {
//       const newCama = this.camaRepository.create(camaData);
//       return await this.camaRepository.save(newCama);
//     } catch (error) {
//       throw new BadRequestException('Error al crear la cama: datos inválidos');
//     }
//   }


//   async findAll(): Promise<Cama[]> {
//     try {
//       const camas = await this.camaRepository.find({
//         where: { estado: 1 }, // Filtra solo las camas con estado = 1
//         relations: ['establecimientoSalud', 'especialidad', 'servicio'],
//       });
//       console.log('Camas encontradas:', camas);
//       return camas;
//     } catch (error) {
//       console.error('Error al obtener la lista de camas:', error);
//       throw new Error('Error al obtener la lista de camas');
//     }
//   }
  

//   async findOne(id: number): Promise<Cama> {
//     // Buscar una cama específica por ID
//     const cama = await this.camaRepository.findOne({ where: { cama_ID: id }, relations: ['establecimientoSalud', 'especialidad', 'servicio'] });
//     if (!cama) {
//       throw new NotFoundException(`Cama con ID ${id} no encontrada`);
//     }
//     return cama;
//   }

//   async update(id: number, camaData: Partial<Cama>): Promise<Cama> {
//     // Actualizar una cama existente
//     const cama = await this.findOne(id);
//     if (!cama) {
//       throw new NotFoundException(`Cama con ID ${id} no encontrada`);
//     }

//     // Actualizar los datos de la cama
//     try {
//       Object.assign(cama, camaData);
//       return await this.camaRepository.save(cama);
//     } catch (error) {
//       throw new BadRequestException('Error al actualizar la cama: datos inválidos');
//     }
//   }


//   // Método para realizar el eliminado lógico
//   async remove(id: number): Promise<void> {
//     const cama = await this.findOne(id);
//     if (!cama) {
//       throw new NotFoundException(`Cama con ID ${id} no encontrada`);
//     }

//     try {
//       // Cambiar el estado de la cama a "eliminado"
//       cama.estado = 0; // Supongamos que 0 significa "eliminado"
//       await this.camaRepository.save(cama);
//     } catch (error) {
//       throw new BadRequestException('Error al eliminar lógicamente la cama');
//     }
//   }




//     //Update
//     async updateCama(id: number, camaData: Partial<Cama>): Promise<Cama> {
//       const cama = await this.camaRepository.findOneBy({ cama_ID: id });
//       if (!cama) {
//         throw new NotFoundException(`Cama con ID ${id} no encontrada`);
//       }
//       Object.assign(cama, camaData);
//       return await this.camaRepository.save(cama);
//     }

//     // Método para actualizar solo las relaciones de especialidad y servicio
//     async updateServicioYEspecialidad(
//       camaId: number,
//       especialidadId: number,
//       servicioId: number,
//     ): Promise<Cama> {
//       const cama = await this.camaRepository.findOne({ where: { cama_ID: camaId } });
//       if (!cama) {
//         throw new NotFoundException(`Cama con ID ${camaId} no encontrada`);
//       }
    
//       const especialidad = await this.especialidadRepository.findOne({ where: { especialidad_ID: especialidadId } });
//       if (!especialidad) {
//         throw new NotFoundException(`Especialidad con ID ${especialidadId} no encontrada`);
//       }
//       cama.especialidad = especialidad;
    
//       const servicio = await this.servicioRepository.findOne({ where: { servicio_ID: servicioId } });
//       if (!servicio) {
//         throw new NotFoundException(`Servicio con ID ${servicioId} no encontrado`);
//       }
//       cama.servicio = servicio;
    
//       console.log('Actualizando cama:', cama);  // Log para verificar los cambios antes de guardar
//       return await this.camaRepository.save(cama);
//     }
// }
