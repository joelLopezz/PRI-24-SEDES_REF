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
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      console.error('Error: Usuario no autenticado.');
      throw new Error('Usuario no autenticado');
    }

    const establecimientoSaludId = currentUser.establecimientoID;

    const especialidades = await this.especialidadRepository
      .createQueryBuilder('especialidad')
      .leftJoin('especialidad.camas', 'cama')
      .leftJoin('cama.historial', 'historiaCama')
      .where('cama.establecimiento_salud_ID = :establecimientoSaludId', { establecimientoSaludId })
      .andWhere('historiaCama.es_actual = :es_actual', { es_actual: 1 })  
      .select([
        'especialidad.nombre AS nombre',
        'historiaCama.historia_ID AS historia_ID',
        'SUM(historiaCama.instalada) AS instaladas',
        'SUM(historiaCama.ofertada) AS ofertadas',
        'SUM(historiaCama.disponible) AS disponibles',
        'SUM(historiaCama.ocupada) AS ocupadas',
        'SUM(historiaCama.alta) AS alta',
      ])
      .groupBy('especialidad.especialidad_ID, historiaCama.historia_ID')
      .getRawMany();

    return especialidades.map((especialidad) => ({
      nombre: especialidad.nombre,
      historia_ID: parseInt(especialidad.historia_ID, 10), 
      instaladas: parseInt(especialidad.instaladas, 10),
      ofertadas: parseInt(especialidad.ofertadas, 10),
      disponibles: parseInt(especialidad.disponibles, 10),
      ocupadas: parseInt(especialidad.ocupadas, 10),
      alta: parseInt(especialidad.alta, 10),
    }));
  }
  


  // Método para obtener especialidades  
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
    if (Array.isArray(datosCama)) {
      throw new BadRequestException('Se esperaba un único objeto para la cama, pero se recibió un arreglo.');
    }

    const currentUser = this.authService.getCurrentUser();   
    const establecimientoID = currentUser.establecimientoID;
    const usuarioID = currentUser.usuarioID;

    const establecimientoSalud = new EstablecimientoSalud();
    establecimientoSalud.id = establecimientoID;

    const especialidad = await this.especialidadRepository.findOne({
      where: { id: datosCama.especialidad },
    });

    const servicio = await this.servicioRepository.findOne({
      where: { servicio_ID: datosCama.servicio },
    });

    if (!establecimientoSalud || !especialidad || !servicio) {
      throw new BadRequestException('Alguna de las entidades relacionadas no fue encontrada.');
    }
    // Crear la nueva cama
    const nuevaCama = new Cama();
    nuevaCama.estado = 1; 
    nuevaCama.establecimientoSalud = establecimientoSalud;
    nuevaCama.especialidad = especialidad;
    nuevaCama.servicio = servicio;
    nuevaCama.usuario_creacion = usuarioID; 
    nuevaCama.fecha_creacion = new Date(); 

    // Guardar la cama
    let camaInsertada: Cama;
    try {
      camaInsertada = await this.camaRepository.save(nuevaCama);
    } catch (error) {
      throw new BadRequestException('Error al crear la cama: ' + error.message);
    }

    if (Array.isArray(datosHistorial)) {
      throw new BadRequestException('Se esperaba un único objeto para el historial, pero se recibió un arreglo.');
  }

    const nuevoHistorial = new HistoriaCama();
    nuevoHistorial.cama = camaInsertada;
    nuevoHistorial.instalada = datosHistorial.instalada;
    nuevoHistorial.ofertada = datosHistorial.ofertada;
    nuevoHistorial.disponible = datosHistorial.disponible;
    nuevoHistorial.ocupada = datosHistorial.ocupada;
    nuevoHistorial.alta = datosHistorial.alta;
    nuevoHistorial.es_actual = 1; 
    nuevoHistorial.usuario_modificacion = usuarioID; 
    nuevoHistorial.fecha_modificacion = new Date(); 

    let historialInsertado: HistoriaCama;
    try {
        historialInsertado = await this.historialCamaRepository.save(nuevoHistorial);
    } catch (error) {
        throw new BadRequestException('Error al crear el historial de la cama: ' + error.message);
    }

    return { cama: camaInsertada, historial: historialInsertado };
  }
}
