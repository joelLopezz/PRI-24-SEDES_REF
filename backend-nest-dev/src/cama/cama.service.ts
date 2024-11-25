import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cama } from '../cama/cama.entity';
import { Specialty } from '../specialty/specialty.entity';
import { Servicio } from '../servicio/servicio.entity';
import {HistoriaCama } from '../historial_cama/historial_cama.entity';
import {AuthService} from '../Auth/auth.service';
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

    @InjectRepository(HistoriaCama)
    private readonly historialCamaRepository: Repository<HistoriaCama>,
    private authService: AuthService,
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


  //Crear nueva cama, solo Admin Hospital
  async crearCamaConHistorial(datosCama: any, datosHistorial: any): Promise<{ cama: Cama; historial: HistoriaCama }> {
    // Validar que los datos de cama no sean un arreglo
    if (Array.isArray(datosCama)) {
      throw new BadRequestException('Se esperaba un único objeto para la cama, pero se recibió un arreglo.');
    }

    // Obtener el usuario autenticado desde AuthService
    const currentUser = this.authService.getCurrentUser();   
    const establecimientoID = currentUser.establecimientoID;
    const usuarioID = currentUser.usuarioID;

    // Crear una nueva instancia de EstablecimientoSalud con el ID
    const establecimientoSalud = new EstablecimientoSalud();
    establecimientoSalud.id = establecimientoID;

    // Buscar la especialidad seleccionada
    const especialidad = await this.especialidadRepository.findOne({
      where: { id: datosCama.especialidad },
    });

    // Buscar el servicio seleccionado
    const servicio = await this.servicioRepository.findOne({
      where: { servicio_ID: datosCama.servicio },
    });

    if (!establecimientoSalud || !especialidad || !servicio) {
      throw new BadRequestException('Alguna de las entidades relacionadas no fue encontrada.');
    }

    // Crear la nueva cama
    const nuevaCama = new Cama();
    nuevaCama.estado = 1; // Estado por defecto
    nuevaCama.establecimientoSalud = establecimientoSalud;
    nuevaCama.especialidad = especialidad;
    nuevaCama.servicio = servicio;
    nuevaCama.usuario_creacion = usuarioID; // Usuario autenticado
    nuevaCama.fecha_creacion = new Date(); // Fecha de creación automática

    // Guardar la cama
    let camaInsertada: Cama;
    try {
      camaInsertada = await this.camaRepository.save(nuevaCama);
    } catch (error) {
      throw new BadRequestException('Error al crear la cama: ' + error.message);
    }

    // Validar que los datos de historial no sean un arreglo
    if (Array.isArray(datosHistorial)) {
      throw new BadRequestException('Se esperaba un único objeto para el historial, pero se recibió un arreglo.');
  }


    // Crear el historial asociado
    const nuevoHistorial = new HistoriaCama();
    nuevoHistorial.cama = camaInsertada;
    nuevoHistorial.instalada = datosHistorial.instalada;
    nuevoHistorial.ofertada = datosHistorial.ofertada;
    nuevoHistorial.disponible = datosHistorial.disponible;
    nuevoHistorial.ocupada = datosHistorial.ocupada;
    nuevoHistorial.alta = datosHistorial.alta;
    nuevoHistorial.es_actual = 1; // es_actual por defecto
    nuevoHistorial.usuario_modificacion = usuarioID; // Usuario autenticado
    nuevoHistorial.fecha_modificacion = new Date(); // Fecha de modificación automática

    // Guardar el historial
    let historialInsertado: HistoriaCama;
    try {
        historialInsertado = await this.historialCamaRepository.save(nuevoHistorial);
    } catch (error) {
        throw new BadRequestException('Error al crear el historial de la cama: ' + error.message);
    }

    // Retornar los registros creados
    return { cama: camaInsertada, historial: historialInsertado };
  }
}
