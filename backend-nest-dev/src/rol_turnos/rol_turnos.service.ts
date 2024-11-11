import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { RolTurno } from './rol_turno.entity';
import { CreateRolTurnoDto } from './dto/create-rol_turno.dto';
import { UpdateRolTurnoDto } from './dto/update-rol_turno.dto';
import { CodificacionTurno } from 'src/codificacion_turnos/codificacion_turno.entity';
import { Specialty } from 'src/specialty/specialty.entity';
import { EstablecimientoSalud } from 'src/establecimiento/establecimiento.entity';
import { PersonalSalud } from 'src/personal_salud/personal_salud.entity';

import { AreaPersonalService } from '../area_personal/area_personal.service';
import { CreateAreaPersonalDto } from '../area_personal/dto/create-area_personal.dto';


@Injectable()
export class RolTurnosService {
  constructor(
    @InjectRepository(RolTurno)
    private rolTurnoRepository: Repository<RolTurno>,
    private areaPersonalService: AreaPersonalService,
    private readonly entityManager: EntityManager,
  ) {}


  // Crear un nuevo turno
  async create(createRolTurnoDto: CreateRolTurnoDto): Promise<RolTurno> {
    const nuevoTurno = this.rolTurnoRepository.create(createRolTurnoDto);
    return this.rolTurnoRepository.save(nuevoTurno);
  }
  

  async createMultipleWithAreas(createRolTurnosDto: CreateRolTurnoDto[], createAreaPersonalDtos: CreateAreaPersonalDto[]): Promise<any> {
    try {
      // Insertar los turnos como en el método anterior
      const nuevosTurnos = await Promise.all(createRolTurnosDto.map(async (dto) => {
        const turno = this.rolTurnoRepository.create(dto);
  
        // Cargar las relaciones necesarias
        if (dto.personal_salud_personal_ID) {
          turno.personalSalud = await this.rolTurnoRepository.manager.findOne(PersonalSalud, {
            where: { personal_ID: dto.personal_salud_personal_ID },
          });
        }
  
        if (dto.establecimiento_salud_idestablecimiento_ID) {
          turno.establecimientoSalud = await this.rolTurnoRepository.manager.findOne(EstablecimientoSalud, {
            where: { id: dto.establecimiento_salud_idestablecimiento_ID },
          });
        }
  
        if (dto.especialidad_especialidad_ID) {
          turno.especialidad = await this.rolTurnoRepository.manager.findOne(Specialty, {
            where: { id: dto.especialidad_especialidad_ID },
          });
        }
  
        if (dto.codificacion_codificacion_turno_ID != null) {
          const codificacion = await this.rolTurnoRepository.manager.findOne(CodificacionTurno, {
            where: { codificacion_turnos_id: dto.codificacion_codificacion_turno_ID },
          });
          turno.codificacionTurno = codificacion || null;
        } else {
          turno.codificacionTurno = null;
        }
  
        return turno;
      }));
  
      // Guardar todos los turnos
      await this.rolTurnoRepository.save(nuevosTurnos);
  
      // Insertar las áreas personales usando el servicio
      await this.areaPersonalService.createMultiple(createAreaPersonalDtos);
  
      return { message: 'Turnos y áreas creados exitosamente.' };
    } catch (error) {
      console.error('Error al crear múltiples turnos y áreas:', error);
      throw new InternalServerErrorException('Error al crear múltiples turnos y áreas.');
    }
  }




  async createMultiple(createRolTurnosDto: CreateRolTurnoDto[]): Promise<RolTurno[]> {
    try {
      // Crear una lista de turnos a partir de los DTOs con las relaciones adecuadas
      const nuevosTurnos = await Promise.all(createRolTurnosDto.map(async (dto) => {
        const turno = this.rolTurnoRepository.create(dto); 
        // Cargar las relaciones necesarias
        if (dto.personal_salud_personal_ID) {
          turno.personalSalud = await this.rolTurnoRepository.manager.findOne(PersonalSalud, {
            where: { personal_ID: dto.personal_salud_personal_ID }
          });
        }
  
        if (dto.establecimiento_salud_idestablecimiento_ID) {
          turno.establecimientoSalud = await this.rolTurnoRepository.manager.findOne(EstablecimientoSalud, {
            where: { id: dto.establecimiento_salud_idestablecimiento_ID }
          });
        }
  
        if (dto.especialidad_especialidad_ID) {
          turno.especialidad = await this.rolTurnoRepository.manager.findOne(Specialty, {
            where: { id: dto.especialidad_especialidad_ID }
          });
        }
        // Verificar si codificacion_codificacion_turnos_ID está presente en el DTO antes de cargar la relación
        if (dto.codificacion_codificacion_turno_ID != null) {         
          const codificacion = await this.rolTurnoRepository.manager.findOne(CodificacionTurno, {
            where: { codificacion_turnos_id: dto.codificacion_codificacion_turno_ID }
          });
          turno.codificacionTurno = codificacion || null;
        } else {
          turno.codificacionTurno = null;
        }
        return turno;
      })); 
      // Guardar todos los turnos
      return await this.rolTurnoRepository.save(nuevosTurnos);
    } catch (error) {
      console.error('Error al crear múltiples turnos:', error);
      throw new InternalServerErrorException('Error al crear múltiples turnos.');
    }
  }
  // Listar todos los turnos
  async findAll(): Promise<RolTurno[]> {
    return this.rolTurnoRepository.find({
      relations: [
        'personalSalud',
        'establecimientoSalud',
        'especialidad',
        'codificacionTurno',
      ],
    });
  }

  async updateMultipleWithAreas(
    updateTurnoDtos: { turno_ID: number; codificacion_codificacion_turno_ID: number | null }[],
    updateAreaDtos: { area_personal_salud_ID: number; area: string }[]
  ): Promise<any> {
    try {
      // Actualizar los turnos como en el método anterior
      const turnosActualizados = await Promise.all(
        updateTurnoDtos.map(async (dto) => {
          console.log('Actualizando turno con ID:', dto.turno_ID);
  
          // Buscar el turno por su ID
          const turno = await this.rolTurnoRepository.findOne({
            where: { turno_ID: dto.turno_ID },
          });
          if (!turno) {
            throw new NotFoundException(
              `El turno con ID ${dto.turno_ID} no fue encontrado`
            );
          }
  
          // Verificar si el valor de codificacion_codificacion_turno_ID está presente en el DTO
          if (dto.codificacion_codificacion_turno_ID != null) {
            console.log('Buscando CodificacionTurno con ID:', dto.codificacion_codificacion_turno_ID);
            const codificacion = await this.rolTurnoRepository.manager.findOne(CodificacionTurno, {
              where: { codificacion_turnos_id: dto.codificacion_codificacion_turno_ID },
            });
            if (!codificacion) {
              throw new NotFoundException(
                `La codificación con ID ${dto.codificacion_codificacion_turno_ID} no fue encontrada`
              );
            }
  
            // Asignar la nueva codificación
            turno.codificacionTurno = codificacion;
            console.log('Nueva codificación asignada:', codificacion);
          } else {
            // Si el valor de codificacion_codificacion_turno_ID es null, asignar null
            turno.codificacionTurno = null;
            console.log('Asignando codificacionTurno a null');
          }
  
          // Guardar los cambios del turno
          return await this.rolTurnoRepository.save(turno);
        })
      );
  
      // Actualizar las áreas personales usando el servicio
      await this.areaPersonalService.updateMultiple(updateAreaDtos);
  
      console.log('Todos los turnos y áreas fueron actualizados con éxito');
      return { message: 'Turnos y áreas actualizados exitosamente.' };
    } catch (error) {
      console.error('Error al actualizar múltiples turnos y áreas:', error);
      throw new InternalServerErrorException(
        'Error al actualizar múltiples turnos y áreas.'
      );
    }
  }




  // Actualizar todos los turnos

  async updateMultipleCodificacionTurno(updateDtos: { turno_ID: number; codificacion_codificacion_turno_ID: number | null }[]): Promise<RolTurno[]> {
    try {
      // Mapear los DTOs para obtener una lista de promesas de actualización de cada turno
      const turnosActualizados = await Promise.all(updateDtos.map(async (dto) => {
        console.log('Actualizando turno con ID:', dto.turno_ID);
  
        // Buscar el turno por su ID
        const turno = await this.rolTurnoRepository.findOne({ where: { turno_ID: dto.turno_ID } });
        if (!turno) {
          throw new NotFoundException(`El turno con ID ${dto.turno_ID} no fue encontrado`);
        }
  
        // Verificar si el valor de codificacion_codificacion_turno_ID está presente en el DTO
        if (dto.codificacion_codificacion_turno_ID != null) {
          console.log('Buscando CodificacionTurno con ID:', dto.codificacion_codificacion_turno_ID);
          const codificacion = await this.rolTurnoRepository.manager.findOne(CodificacionTurno, {
            where: { codificacion_turnos_id: dto.codificacion_codificacion_turno_ID },
          });
          if (!codificacion) {
            throw new NotFoundException(`La codificación con ID ${dto.codificacion_codificacion_turno_ID} no fue encontrada`);
          }
  
          // Asignar la nueva codificación
          turno.codificacionTurno = codificacion;
          console.log('Nueva codificación asignada:', codificacion);
        } else {
          // Si el valor de codificacion_codificacion_turno_ID es null, asignar null
          turno.codificacionTurno = null;
          console.log('Asignando codificacionTurno a null');
        }
  
        // Guardar los cambios
        return await this.rolTurnoRepository.save(turno);
      }));
  
      console.log('Todos los turnos fueron actualizados con éxito');
      return turnosActualizados;
    } catch (error) {
      console.error('Error al actualizar múltiples turnos:', error);
      throw new InternalServerErrorException('Error al actualizar múltiples turnos.');
    }
  }

  async obtenerReporteEspecialidades(): Promise<any[]> {
    try {
      // Ejecutar el SELECT sobre la vista
      const resultado = await this.entityManager.query('SELECT especialidad_ID as ID, nombre FROM especialidad ORDER BY 2');
      return resultado;
    } catch (error) {
      console.error('Error al obtener el reporte de especialidades:', error);
      throw error;
    }
  }

  // Buscar un turno por ID
  async findOne(id: number): Promise<RolTurno> {
    const turno = await this.rolTurnoRepository.findOne({
      where: { turno_ID: id },
      relations: [
        'personalSalud',
        'establecimientoSalud',
        'especialidad',
        'codificacionTurno',
      ],
    });

    if (!turno) {
      throw new NotFoundException(`El turno con ID ${id} no fue encontrado`);
    }

    return turno;
  }

  // Actualizar un turno por ID
  async update(id: number, updateRolTurnoDto: UpdateRolTurnoDto): Promise<RolTurno> {
    await this.rolTurnoRepository.update(id, updateRolTurnoDto);
    const turnoActualizado = await this.findOne(id);
    return turnoActualizado;
  }

  // Eliminar un turno por ID
  async remove(id: number): Promise<void> {
    const resultado = await this.rolTurnoRepository.delete(id);

    if (resultado.affected === 0) {
      throw new NotFoundException(`El turno con ID ${id} no fue encontrado`);
    }
  }

  // Obtener turnos para un mes específico y especialidad utilizando el procedimiento almacenado
  async findTurnosByMesYEspecialidad(mes: number, anio: number, especialidadId: number, hospitalId: number) {
    try {
      // Validar que los parámetros sean válidos
      if (mes === undefined || anio === undefined || especialidadId === undefined || hospitalId  === undefined) {
        throw new BadRequestException('Parámetros faltantes: mes, anio o especialidadId');
      }
      if (isNaN(mes) || mes < 1 || mes > 12) {
        throw new BadRequestException('El mes proporcionado no es válido. Debe estar entre 1 y 12.');
      }
      if (isNaN(anio) || anio < 1900) {
        throw new BadRequestException('El año proporcionado no es válido. Debe ser mayor a 1900.');
      }
      if (isNaN(especialidadId) || especialidadId <= 0) {
        throw new BadRequestException('El ID de la especialidad no es válido.');
      }
      if (isNaN(hospitalId) || hospitalId <= 0) {
        throw new BadRequestException('El ID del hospital no es válido.');
      }
      // Llamar al procedimiento almacenado
      /*
        Este es el procedimiendo de almacenado que esta en la base de datos

        DELIMITER $$

        CREATE PROCEDURE obtener_turnos_por_mes(
            IN p_mes INT,
            IN p_anio INT,
            IN p_especialidad_id INT
        )
        BEGIN
            DECLARE total_count INT;

            -- First attempt to get the main query result
            SET total_count = (SELECT COUNT(*) FROM turno T WHERE MONTH(T.fecha) = p_mes AND YEAR(T.fecha) = p_anio AND T.especialidad_especialidad_ID = p_especialidad_id);

            -- If no results, try the next query
            IF total_count > 0 THEN
                SELECT
              P.personal_ID AS 'Personal ID',
                    CONCAT(P.nombres, ' ', P.primer_apellido, ' ', P.segundo_nombre) AS 'Nombre Completo',
                    IFNULL((
                        SELECT GROUP_CONCAT(CONCAT(area_personal_salud_ID, ':', area) SEPARATOR ',') AS resultado
                FROM area_personal_salud
                WHERE personal_salud_personal_ID = P.personal_ID AND MONTH(fecha) = p_mes AND YEAR(fecha) = p_anio
                    ),'S/A') AS Area,
                    GROUP_CONCAT(
                        CONCAT(d.dia, ':', IFNULL(C.Sigla, 'S/I'), ':', T.turno_ID)
                        ORDER BY d.dia
                        SEPARATOR ','
                    ) AS 'Turnos'
                FROM (
                    SELECT 1 AS dia UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL
                    SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL
                    SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12 UNION ALL
                    SELECT 13 UNION ALL SELECT 14 UNION ALL SELECT 15 UNION ALL SELECT 16 UNION ALL
                    SELECT 17 UNION ALL SELECT 18 UNION ALL SELECT 19 UNION ALL SELECT 20 UNION ALL
                    SELECT 21 UNION ALL SELECT 22 UNION ALL SELECT 23 UNION ALL SELECT 24 UNION ALL
                    SELECT 25 UNION ALL SELECT 26 UNION ALL SELECT 27 UNION ALL SELECT 28 UNION ALL
                    SELECT 29 UNION ALL SELECT 30 UNION ALL SELECT 31
                ) d
                LEFT JOIN turno T ON DAY(T.fecha) = d.dia AND MONTH(T.fecha) = p_mes AND YEAR(T.fecha) = p_anio AND T.especialidad_especialidad_ID = p_especialidad_id
                LEFT JOIN codificacion_turnos C ON C.codificacion_turnos_id = T.codificacion_codificacion_turnos_ID
                LEFT JOIN personal_salud P ON P.personal_ID = T.personal_salud_personal_ID
                LEFT JOIN establecimiento_salud E ON E.idestablecimiento_ID = T.establecimiento_salud_idestablecimiento_ID
                LEFT JOIN especialidad ES ON ES.especialidad_ID = T.especialidad_especialidad_ID
                WHERE T.especialidad_especialidad_ID = p_especialidad_id
                GROUP BY T.personal_salud_personal_ID, T.establecimiento_salud_idestablecimiento_ID, T.especialidad_especialidad_ID;
            ELSE
            SET total_count = (SELECT COUNT(*) FROM personal_salud P INNER JOIN personal_especialidad_hospital PEH ON PEH.idPersonal_Especialidad_Hospital = P.personal_ID WHERE PEH.Especialidad_id = p_especialidad_id);
                
                IF total_count > 0 THEN
                    SELECT P.personal_ID AS 'Personal ID', CONCAT(P.nombres, ' ', P.primer_apellido, ' ', P.segundo_nombre) AS 'Nombre Completo', 
                IFNULL((SELECT GROUP_CONCAT(CONCAT(area_personal_salud_ID, ':', area) SEPARATOR ',')
                FROM area_personal_salud
                WHERE personal_salud_personal_ID = P.personal_ID AND MONTH(fecha) = p_mes AND YEAR(fecha) = p_anio),'S/A') AS Area, 'S/T' AS Turnos
                    FROM personal_salud P
                    INNER JOIN personal_especialidad_hospital PEH ON PEH.idPersonal_Especialidad_Hospital = P.personal_ID
                    WHERE PEH.Especialidad_id = p_especialidad_id;
                ELSE
                    SELECT 'S/D' AS 'Personal ID', 'S/D' AS 'Nombre Completo', 'S/A' AS Area, 'S/T' AS Turnos;
                END IF;
            END IF;
        END$$

        DELIMITER ;
      */
      const turnos = await this.rolTurnoRepository.query('CALL obtener_turnos_por_mes(?, ?, ?, ?)', [mes, anio, especialidadId, hospitalId]);
      return turnos[0];
    } catch (error) {
      throw new InternalServerErrorException('Ha ocurrido un error al intentar obtener los turnos. Verifique los registros para más detalles.');
    }
  }
}