/* eslint-disable prettier/prettier */

import { RedCordinacion } from '../red-cordinacion/red-cordinacion.entity';
import { Municipio } from '../municipio/municipio.entity';
//import { RedCordinacion } from '../red-cordinacion/red-cordinacion.entity'; // Importa la entidad RedCordinacion
import {Cama}  from '../cama/cama.entity'; 
import {RolTurno}  from '../rol_turnos/rol_turno.entity'; 
import {CodificacionTurno} from '../codificacion_turnos/codificacion_turno.entity';
import { PersonalSalud } from '../personal_salud/personal_salud.entity';
import {PersoEspeciaHospital} from '../perso_especia_hospital/entities/perso_especia_hospital.entity'

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';

@Entity('establecimiento_salud')
export class EstablecimientoSalud {
  @PrimaryGeneratedColumn({ name: 'idestablecimiento_ID', type: 'smallint' })
  id: number;

  @Column({ type: 'varchar', length: 65 })
  nombre: string;

  @Column({ type: 'varchar', length: 30 })
  nivel: string;

  @Column({ type: 'varchar', length: 12 })
  telefono: string;
  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitud: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitud: number;

  @Column({ type: 'tinyint' })
  red_cordinacion_red_ID: number;

  @Column({ type: 'smallint' })
  municipio_ID: number;

  @Column({ type: 'varchar', length: 50 }) // Aquí agregamos el campo RUES
  rues: string;

  @Column({ type: 'tinyint', default: 1 })
  estado: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  fecha_modificacion: Date;

  @ManyToOne(() => RedCordinacion, (red) => red.red_ID)
  @JoinColumn({ name: 'red_cordinacion_red_ID' })
  redCordinacion: RedCordinacion;

  @ManyToOne(() => Municipio, (municipio) => municipio.municipio_ID)
  @JoinColumn({ name: 'municipio_ID' })
  municipio: Municipio;

  @Column({ type: 'mediumint', nullable: false })
  usuario_creacion: number;

  @Column({ type: 'mediumint', nullable: true })
  usuario_modificacion: number;

  // Relación con la entidad Cama (relación inversa)
  @OneToMany(() => Cama, (cama) => cama.establecimientoSalud)
  camas: Cama[];

  @OneToMany(() => RolTurno, (turno) => turno.establecimientoSalud)
  turnos: RolTurno[];

  @OneToMany(() => CodificacionTurno, (codificacionTurno) => codificacionTurno.establecimientoSalud)
  codificacionTurnos: CodificacionTurno[];

  // Definir la relación inversa con la entidad PersonalSalud
  @OneToMany(() => PersonalSalud, (personal) => personal.establecimientoSalud)
  personalSalud: PersonalSalud[]; // Relación inversa para conectar con `PersonalSalud`

  @OneToMany(() => PersoEspeciaHospital, (especial) => especial.hospital)
  personalEspecialidadHospital: PersoEspeciaHospital[];
}
