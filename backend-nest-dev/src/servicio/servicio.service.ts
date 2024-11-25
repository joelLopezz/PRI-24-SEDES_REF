/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from './servicio.entity';
import { Specialty } from '../specialty/specialty.entity'; // Importar la entidad Especialidad
@Injectable()
export class ServicioService {
  constructor(
    @InjectRepository(Servicio)
    private servicioRepository: Repository<Servicio>,
    @InjectRepository(Specialty)
    private specialtyRepository: Repository<Specialty>, // Repositorio para Especialidad
  ) {}
  // Crear un nuevo servicio
  async create(servicioData: Partial<Servicio> & { usuario_ID: number }): Promise<Servicio> {
    // Convertir el código a mayúsculas para consistencia
    servicioData.codigo = servicioData.codigo.toUpperCase();

    // Verificar si ya existe un servicio con el mismo código
    const existingServicio = await this.servicioRepository.findOne({ where: { codigo: servicioData.codigo } });
    if (existingServicio) {
      throw new BadRequestException(`Ya existe un servicio con el código ${servicioData.codigo}`);
    }

    const newServicio = this.servicioRepository.create({
      ...servicioData,
      usuario_creacion: servicioData.usuario_ID,
    });
    return await this.servicioRepository.save(newServicio);
  }
  // Obtener todos los servicios (relacionado con especialidad si es necesario)
  async findAll(): Promise<Servicio[]> {
    return await this.servicioRepository.find({
      where: { estado: 1 },
      relations: ['especialidad'], // Incluir la relación con Especialidad
    });
  }
  // Obtener un servicio por su ID
  async findOne(id: number): Promise<Servicio> {
    const servicio = await this.servicioRepository.findOne({
      where: { servicio_ID: id },
      relations: ['especialidad'], // Incluir la relación con Especialidad
    });
    if (!servicio) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    }
    return servicio;
  }
  // Actualizar un servicio
  async updateServicio(id: number, data: Partial<Servicio> & { usuario_ID: number }): Promise<Servicio> {
    const { usuario_ID, ...updateData } = data; // Extrae usuario_ID y el resto de datos
    if (updateData.especialidad_ID) {
      const especialidad = await this.specialtyRepository.findOne({
        where: { id: updateData.especialidad_ID },
      });
      if (!especialidad) {
        throw new NotFoundException(`Especialidad con ID ${updateData.especialidad_ID} no encontrada`);
      }
      updateData.especialidad = especialidad;
    }
    updateData.fecha_modificacion = new Date();
    updateData.usuario_modificacion = usuario_ID; // Asigna usuario_ID a usuario_modificacion
  
    await this.servicioRepository.update(id, updateData); // Usa updateData sin usuario_ID
  
    return this.servicioRepository.findOne({
      where: { servicio_ID: id },
      relations: ['especialidad'],
    });
  }
  // Eliminar un servicio (eliminación lógica)
  async deleteServicio(id: number, usuario_ID: number): Promise<void> {
    await this.servicioRepository.update(id, {
      estado: 0,
      fecha_modificacion: new Date(),
      usuario_modificacion: usuario_ID, // Asigna el usuario de modificación para la eliminación lógica
    });
  }
  // Nuevo método para obtener servicios por especialidad
  async findByEspecialidad(especialidadId: number): Promise<Servicio[]> {
    return this.servicioRepository.find({
      where: { especialidad_ID: especialidadId },
      select: ['servicio_ID', 'codigo', 'nombre'], // Seleccionamos solo los campos necesarios
    });
  }


  //List de servicios(id y nombre servicio)
  async getServiceForSelect(): Promise<Partial<Servicio[]>> {
    return this.servicioRepository.find({
      select: ['servicio_ID', 'nombre'],
    });
  }
}
