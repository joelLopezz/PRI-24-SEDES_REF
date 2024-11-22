import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from '../paciente/paciente.entity';

@Entity('tratamiento')
export class Tratamientos {
  @PrimaryGeneratedColumn()
  tratamiento_ID: number;

  @Column({ type: 'text' })  
  descripcion: string;

  @Column({ type: 'tinyint' })
  estado: number;

  @Column({ type: 'datetime' })
  fecha_creacion: Date;

  @Column({ type: 'datetime', nullable: true })
  fecha_modificacion: Date;

  // Relación ManyToOne con Paciente
  @ManyToOne(() => Paciente, (paciente) => paciente.tratamiento)
  @JoinColumn({ name: 'paciente_paciente_ID' })  // Se usa el nombre correcto de la clave foránea
  paciente: Paciente;
}
