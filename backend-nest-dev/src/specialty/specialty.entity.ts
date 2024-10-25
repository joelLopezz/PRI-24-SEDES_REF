import { Servicio } from '../servicio/servicio.entity'; // Importa la entidad Servicio
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

  @Column({ type: 'varchar', length: 60 })
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

  // Relación inversa con la entidad Servicio
  @OneToMany(() => Servicio, (servicio) => servicio.especialidad)
  servicios: Servicio[];
}
