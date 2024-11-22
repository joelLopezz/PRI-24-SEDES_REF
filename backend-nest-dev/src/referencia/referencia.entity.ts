// src/referencia/referencia.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from '../paciente/paciente.entity';

@Entity()
export class Referencia {
  @PrimaryGeneratedColumn()
  referencia_ID: number;

  @Column({ type: 'date' })
  fecha_ingreso: Date;

  @Column({ type: 'date' })
  fecha_envio: Date;

  @Column({ type: 'text' })
  motivo_referencia: string;

  @Column({ type: 'varchar', length: 65 })
  nombre_contacto_receptor: string;

  @Column({ type: 'varchar', length: 60 })
  medio_comunicacion: string;

  @Column({ type: 'date' })
  fecha_recepcion: Date;

  @Column({ type: 'time' })
  hora_recepcion: string;

  @ManyToOne(() => Paciente)
  @JoinColumn({ name: 'paciente_paciente_ID' })
  paciente_paciente_ID: Paciente;

  @Column()
  establecimiento_salud_receptor: number;

  @Column()
  establecimiento_salud_referente: number;

  @Column({ type: 'tinyint', nullable: true })
  estado_aprobacion: number;

  @Column({ type: 'tinyint' })
  estado: number;

  @Column({ type: 'datetime' })
  fecha_creacion: Date;

  @Column({ type: 'datetime', nullable: true })
  fecha_modificacion: Date;

  @Column({ type: 'mediumint' })
  usuario_creacion: number;

  @Column({ type: 'mediumint', nullable: true })
  usuario_modificacion: number;
}
