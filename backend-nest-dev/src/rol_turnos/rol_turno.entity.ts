import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { PersonalSalud } from '../personal_salud/personal_salud.entity';
  import { EstablecimientoSalud } from '../establecimiento/establecimiento.entity';
  import { Specialty } from '../specialty/specialty.entity';
  import { CodificacionTurno } from '../codificacion_turnos/codificacion_turno.entity';

 
  
  @Entity('turno')
  export class RolTurno {
    @PrimaryGeneratedColumn()
    turno_ID: number;
  
    @Column({ type: 'date' })
    fecha: Date;
  
    @ManyToOne(() => PersonalSalud, (personalSalud) => personalSalud.turnos)
    @JoinColumn({ name: 'personal_salud_personal_ID' })
    personalSalud: PersonalSalud;
  
    @ManyToOne(() => EstablecimientoSalud, (establecimiento) => establecimiento.turnos)
    @JoinColumn({ name: 'establecimiento_salud_idestablecimiento_ID' })
    establecimientoSalud: EstablecimientoSalud;
  
    @ManyToOne(() => Specialty, (especialidad) => especialidad.turnos)
    @JoinColumn({ name: 'especialidad_especialidad_ID' })
    especialidad: Specialty;
  
    @ManyToOne(() => CodificacionTurno, (codificacion) => codificacion.turnos, { nullable: true })
    @JoinColumn({ name: 'codificacion_codificacion_turnos_ID' })
    codificacionTurno: CodificacionTurno | null;
  
    @Column({ type: 'tinyint', default: 1 })
    estado: number;
  
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    fecha_creacion: Date;
  
    @Column({ type: 'datetime', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
    fecha_modificacion: Date;
  
    @Column({ type: 'mediumint' })
    usuario_creacion: number;
  
    @Column({ type: 'mediumint', nullable: true })
    usuario_modificacion: number;
  }