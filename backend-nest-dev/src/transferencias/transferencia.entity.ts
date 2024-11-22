import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Paciente } from '../paciente/paciente.entity';

@Entity('transferencias')
export class Transferencia {
  @PrimaryGeneratedColumn()
  transferencia_ID: number;

  @Column({ type: 'date' })
  fecha_ingreso: Date;

  @Column({ type: 'date' })
  fecha_envio: Date;

  @Column({ type: 'time' })  // Tipo corregido a TIME
  hora_envio: string;

  @Column({ type: 'varchar', length: 65 })
  motivo_transferencia: string;

  @Column({ type: 'varchar', length: 65 })
  nombre_contacto_receptor: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  medio_comunicacion: string;

  @Column({ type: 'date' })
  fecha_recepcion: Date;

  @Column({ type: 'date' })  //deberia ser TIME
  hora_recepcion: Date;

  @Column({ type: 'tinyint' })
  paciente_admitido: number;

  // Clave foránea gestionada automáticamente por ManyToOne, eliminada la declaración manual
  @ManyToOne(() => Paciente, (paciente) => paciente.transferencias)
  @JoinColumn({ name: 'paciente_paciente_ID' })  // Clave foránea gestionada por la relación
  paciente: Paciente;

  @Column({ type: 'smallint' })
  establecimiento_salud_referente: number;

  @Column({ type: 'smallint' })
  establecimiento_salud_receptor: number;

  @Column({ type: 'tinyint' })
  estado: number;

  @Column({ type: 'datetime' })
  fecha_creacion: Date;

  @Column({ type: 'datetime', nullable: true })
  fecha_modificacion: Date;
}
