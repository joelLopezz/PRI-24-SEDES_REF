import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class ConsultaExternaService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async obtenerReporteEspecialidades(): Promise<any[]> {
    try {
      // Ejecutar el SELECT sobre la vista
      const resultado = await this.entityManager.query('SELECT * FROM vista_especialidades_conteo_areas');
      return resultado;
    } catch (error) {
      console.error('Error al obtener el reporte de especialidades:', error);
      throw error;
    }
  }

  async obtenerReporteCompleto(): Promise<any[]> {
    try {
      // Paso 1: Obtener la lista de especialidades desde la vista
      const especialidades = await this.entityManager.query('SELECT * FROM vista_especialidades_conteo_areas');

      // Paso 2: Iterar sobre cada especialidad y obtener sus turnos
      const reporteCompleto = await Promise.all(especialidades.map(async (especialidad) => {
        // Ejecutar el procedimiento almacenado para obtener los turnos de la especialidad actual
        const turnos = await this.entityManager.query('CALL obtener_turnos(?)', [especialidad.ID]);

        // Combinar la información de la especialidad con la información de los turnos
        return {
          ...especialidad,
          turnos: turnos[0], // Supongo que los turnos están en la primera posición
        };
      }));

      // Paso 3: Retornar el reporte completo
      return reporteCompleto;
    } catch (error) {
      console.error('Error al obtener el reporte completo:', error);
      throw error;
    }
  }
}
