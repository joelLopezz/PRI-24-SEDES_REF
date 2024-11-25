/* eslint-disable prettier/prettier */
import { Servicio } from '../servicio/servicio.entity';
import { Cama } from 'src/cama/cama.entity';
import {RolTurno}  from '../rol_turnos/rol_turno.entity'; 
import {CodificacionTurno}  from '../codificacion_turnos/codificacion_turno.entity'; 
import {PersoEspeciaHospital} from '../perso_especia_hospital/entities/perso_especia_hospital.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('especialidad')
export class Specialty {
  @PrimaryGeneratedColumn({ name: 'especialidad_ID', type: 'smallint' })
  id: number;

  @Column({ type: 'varchar', length: 60, unique: true })
  nombre: string;  

  @Column({ type: 'tinyint', default: 1 })
  estado: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  fecha_modificacion: Date;

  @Column({ type: 'mediumint', nullable: false })
  usuario_creacion: number;

  @Column({ type: 'mediumint', nullable: true })
  usuario_modificacion: number;

  // Nuevos campos añadidos
  @Column({ type: 'tinyint', nullable: true })
  emergencias: number | null;

  @Column({ type: 'tinyint', nullable: true })
  medicina_interna: number | null;

  @Column({ type: 'tinyint', nullable: true })
  consulta_externa: number | null;

  // Relación inversa con la entidad Servicio
  @OneToMany(() => Servicio, (servicio) => servicio.especialidad)
  servicios: Servicio[];

  @OneToMany(() => Cama, (cama) => cama.especialidad)
  camas: Cama[];

  @OneToMany(() => RolTurno, (turno) => turno.especialidad)
  turnos: RolTurno[];

  @OneToMany(() => CodificacionTurno, (codificacion) => codificacion.especialidad)
  codificacionesTurno: CodificacionTurno[];


  @OneToMany(() => PersoEspeciaHospital, (especial) => especial.especialidad)
  personalEspecialidad: PersoEspeciaHospital[];
}
