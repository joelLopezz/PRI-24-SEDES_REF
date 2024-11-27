  import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

  import {RolTurno}  from '../rol_turnos/rol_turno.entity'; 
  import { Specialty } from 'src/specialty/specialty.entity';
  import { EstablecimientoSalud } from '../establecimiento/establecimiento.entity';

  @Entity('codificacion_turnos')
  export class CodificacionTurno {
    
    @PrimaryGeneratedColumn()
    codificacion_turnos_id: number;

    @ManyToOne(() => Specialty, (especialidad) => especialidad.codificacionesTurno)
    @JoinColumn({ name: 'especialidad_especialidad_ID' })
    especialidad: Specialty;

    @Column({ type: 'varchar', length: 45 })
    Turno: string;

    @Column({ type: 'varchar', length: 4 })
    Sigla: string;

    @Column({ type: 'time' })
    Hora_Inicio: string;

    @Column({ type: 'time' })
    Hora_Fin: string;

    @Column({ type: 'varchar', length: 3 })
    Carga_Horaria: string;

    @OneToMany(() => RolTurno, (turno) => turno.codificacionTurno)
    turnos: RolTurno[];

    @Column({ type: 'date', nullable: true })
      fecha: Date;

    @ManyToOne(() => EstablecimientoSalud, (establecimiento) => establecimiento.codificacionTurnos)
    @JoinColumn({ name: 'establecimiento_idestablecimiento_ID' })
    establecimientoSalud: EstablecimientoSalud;
  }