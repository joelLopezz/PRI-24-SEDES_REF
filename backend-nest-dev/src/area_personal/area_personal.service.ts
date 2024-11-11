import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AreaPersonal } from './area_personal.entity';
import { CreateAreaPersonalDto } from './dto/create-area_personal.dto';
import { UpdateAreaPersonalDto } from './dto/update-area_personal.dto';
import { PersonalSalud } from '../personal_salud/personal_salud.entity';

@Injectable()
export class AreaPersonalService {
  constructor(
    @InjectRepository(AreaPersonal)
    private areaPersonalRepository: Repository<AreaPersonal>,
  ) {}

  // Crear una nueva área personal
  async create(createAreaPersonalDto: CreateAreaPersonalDto): Promise<AreaPersonal> {
    const areaPersonal = this.areaPersonalRepository.create(createAreaPersonalDto);
    return this.areaPersonalRepository.save(areaPersonal);
  }

  // Eliminar múltiples áreas personales por sus IDs
  async deleteMultiple(ids: number[]): Promise<void> {
    try {
      const deleteResult = await this.areaPersonalRepository.delete(ids);

      if (deleteResult.affected === 0) {
        throw new NotFoundException(`No se encontraron áreas con los IDs proporcionados`);
      }
    } catch (error) {
      console.error('Error al eliminar múltiples áreas personales:', error);
      throw new InternalServerErrorException('Error al eliminar múltiples áreas personales.');
    }
  }

  // Crear múltiples áreas personales
  async createMultiple(createAreaPersonalDtos: CreateAreaPersonalDto[]): Promise<AreaPersonal[]> {
    try {
      // Crear una lista de áreas personales con las relaciones adecuadas
      const nuevasAreas = await Promise.all(createAreaPersonalDtos.map(async (dto) => {
        // Crear el área personal a partir del DTO
        const areaPersonal = this.areaPersonalRepository.create(dto);
        
        // Cargar las relaciones necesarias
        if (dto.personal_salud_personal_ID) {
          const personalSalud = await this.areaPersonalRepository.manager.findOne(PersonalSalud, {
            where: { personal_ID: dto.personal_salud_personal_ID },
          });
  
          if (!personalSalud) {
            throw new NotFoundException(`El personal de salud con ID ${dto.personal_salud_personal_ID} no fue encontrado`);
          }
  
          // Asignar la relación de personalSalud al área personal
          areaPersonal.personalSalud = personalSalud;
        }
  
        return areaPersonal;
      }));
  
      // Guardar todas las áreas personales
      return await this.areaPersonalRepository.save(nuevasAreas);
    } catch (error) {
      console.error('Error al crear múltiples áreas personales:', error);
      throw new InternalServerErrorException('Error al crear múltiples áreas personales.');
    }
  }

  async updateMultiple(updateAreaDtos: { area_personal_salud_ID: number; area: string }[]): Promise<AreaPersonal[]> {
    try {
      // Crear una lista de áreas personales a partir de los DTOs
      const areasActualizadas = await Promise.all(
        updateAreaDtos.map(async (dto) => {
          console.log('Actualizando área con ID:', dto.area_personal_salud_ID);
  
          // Buscar el área por su ID
          const areaPersonal = await this.areaPersonalRepository.findOne({
            where: { area_personal_salud_ID: dto.area_personal_salud_ID },
          });
  
          if (!areaPersonal) {
            throw new NotFoundException(`El área con ID ${dto.area_personal_salud_ID} no fue encontrada`);
          }
  
          // Actualizar el campo 'area'
          areaPersonal.area = dto.area;
  
          // Guardar los cambios del área personal
          return await this.areaPersonalRepository.save(areaPersonal);
        })
      );
  
      console.log('Todas las áreas fueron actualizadas con éxito');
      return areasActualizadas;
    } catch (error) {
      console.error('Error al actualizar múltiples áreas personales:', error);
      throw new InternalServerErrorException('Error al actualizar múltiples áreas personales.');
    }
  }

  // Obtener todas las áreas personales
  async findAll(): Promise<AreaPersonal[]> {
    return this.areaPersonalRepository.find({
      relations: ['personalSalud'],
    });
  }

  // Obtener un área personal por ID
  async findOne(id: number): Promise<AreaPersonal> {
    const areaPersonal = await this.areaPersonalRepository.findOne({
      where: { area_personal_salud_ID: id },
      relations: ['personalSalud'],
    });

    if (!areaPersonal) {
      throw new NotFoundException(`El área con ID ${id} no fue encontrada`);
    }

    return areaPersonal;
  }

  // Actualizar un área personal por ID
  async update(id: number, updateAreaPersonalDto: UpdateAreaPersonalDto): Promise<AreaPersonal> {
    await this.areaPersonalRepository.update(id, updateAreaPersonalDto);
    const updatedAreaPersonal = await this.findOne(id);
    return updatedAreaPersonal;
  }

  // Eliminar un área personal por ID
  async remove(id: number): Promise<void> {
    const result = await this.areaPersonalRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`El área con ID ${id} no fue encontrada`);
    }
  }
}