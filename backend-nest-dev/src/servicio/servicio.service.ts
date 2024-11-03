// servicio.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from './servico.entity'; // corregido el nombre del archivo

@Injectable()
export class ServicioService {
  constructor(
    @InjectRepository(Servicio)
    private servicioRepository: Repository<Servicio>,
  ) {}

  // Crear un nuevo servicio
  async create(servicioData: Partial<Servicio>): Promise<Servicio> {
    const newServicio = this.servicioRepository.create(servicioData);
    return await this.servicioRepository.save(newServicio);
  }

  // Obtener todos los servicios e incluir la información del tipo relacionado
  async findAll(): Promise<Servicio[]> {
    return await this.servicioRepository.find(); // Eliminada la relación 'tipo' ya que no se tiene definida
  }

  // Obtener un servicio por su ID
  async findOne(id: number): Promise<Servicio> {
    const servicio = await this.servicioRepository.findOne({
      where: { servicio_ID:id  }, // Corregido el campo a 'id' para que coincida con el atributo de la entidad
    });
    if (!servicio) {
      throw new NotFoundException(`Servicio with ID ${id} not found`);
    }
    return servicio;
  }

  // Actualizar un servicio
  async updateServicio(id: number, data: Partial<Servicio>): Promise<Servicio> {
    data.fecha_modificacion = new Date();
    await this.servicioRepository.update(id, data);
    return await this.findOne(id); // Corregido para retornar la entidad actualizada
  }

  // Eliminar un servicio (lógica)
  async deleteServicio(id: number): Promise<void> {
    await this.servicioRepository.update(id, {
      estado: 0,
      fecha_modificacion: new Date(),
    });
  }


  //cargar  servicios
  async findAllServicios(): Promise<{ servicio_ID: number; nombre: string }[]> {
    return await this.servicioRepository
      .createQueryBuilder('servicio')
      .select(['servicio.servicio_ID', 'servicio.nombre'])
      .getRawMany();
  }

}





// // src/servicio/servicio.service.ts
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Servicio } from './servico.entity';

// @Injectable()
// export class ServicioService {
//   constructor(
//     @InjectRepository(Servicio)
//     private servicioRepository: Repository<Servicio>,
//   ) {}

//   // Crear un nuevo servicio
//   async create(servicioData: Partial<Servicio>): Promise<Servicio> {
//     const newServicio = this.servicioRepository.create(servicioData);
//     return await this.servicioRepository.save(newServicio);
//   }

//   // Obtener todos los servicios e incluir la información del tipo relacionado
//   async findAll(): Promise<Servicio[]> {
//     return await this.servicioRepository.find({
//       relations: ['tipo'], // Incluir la relación con Tipo
//     });
//   }

//   // Obtener un servicio por su ID
//   async findOne(id: number): Promise<Servicio> {
//     const servicio = await this.servicioRepository.findOne({
//       where: { servicio_ID: id },
//     });
//     if (!servicio) {
//       throw new NotFoundException(`Servicio with ID ${id} not found`);
//     }
//     return servicio;
//   }

//   // Actualizar un servicio
//   async updateServicio(id: number, data: Partial<Servicio>): Promise<Servicio> {
//     // Actualizar la fecha de modificación y asignar el usuario de modificación
//     data.fecha_modificacion = new Date();
//     await this.servicioRepository.update(id, data);
//     return this.servicioRepository.findOne({ where: { servicio_ID: id } });
//   }

//   // Eliminar un servicio
//   async deleteServicio(id: number): Promise<void> {
//     // Establecer estado = 0 para eliminación lógica y actualizar los campos relevantes
//     await this.servicioRepository.update(id, {
//       estado: 0,
//       fecha_modificacion: new Date(),
//       usuario_modificacion: 1, // Temporalmente 1, reemplazar con el ID del usuario de sesión en el futuro
//     });
//   }
// }