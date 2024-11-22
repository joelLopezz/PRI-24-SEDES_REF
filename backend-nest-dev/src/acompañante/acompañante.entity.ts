import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from '../paciente/paciente.entity';

@Entity('acompañante')
export class Acompanante {
  @PrimaryGeneratedColumn()
  acompaniante_ID: number;

  @Column({ type: 'varchar', length: 65 })
  nombre: string;

  @Column({ type: 'varchar', length: 12 })
  telefono: string;

  @Column({ type: 'varchar', length: 40 })
  parentesco: string;

  @Column({ type: 'tinyint' })
  estado: number;

  @Column({ type: 'datetime' })
  fecha_creacion: Date;

  @Column({ type: 'datetime', nullable: true })
  fecha_modificacion: Date;

  @ManyToOne(() => Paciente, (paciente) => paciente.acompanantes)
  @JoinColumn({ name: 'paciente_paciente_ID' })  // Aquí especificas el nombre de la clave foránea
  paciente: Paciente;
}
