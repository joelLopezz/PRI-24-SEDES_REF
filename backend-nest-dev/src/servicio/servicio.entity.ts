import { Specialty } from '../specialty/specialty.entity'; // Importar la entidad Especialidad
import { Cama } from '../cama/cama.entity'; // Asegúrate de importar la entidad Cama   ==> Cod añadido
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('servicio')
export class Servicio {
  @PrimaryGeneratedColumn({ name: 'servicio_ID', type: 'smallint' })
  servicio_ID: number;

  @Column({ type: 'varchar', length: 500 }) // Ajuste del tamaño del campo "nombre"
  nombre: string;

  @Column({ type: 'varchar', length: 15, unique: true }) // Agrega unique: true
  codigo: string; // Campo nuevo para el código del servicio

  @Column({ type: 'tinyint', default: 1 })
  estado: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  fecha_modificacion: Date;

  // Usuario que crea el registro
  @Column({ type: 'mediumint', nullable: false })
  usuario_creacion: number;

  // Usuario que modifica el registro
  @Column({ type: 'mediumint', nullable: true })
  usuario_modificacion: number;

  // Relación con la Especialidad
  @Column({ type: 'smallint' })
  especialidad_ID: number; // Relación con especialidad

  // Puede añadirse una relación ManyToOne para incluir la entidad `Especialidad` si deseas obtener los nombres en las consultas
  // Relación con la entidad Especialidad
  @ManyToOne(() => Specialty, (especialidad) => especialidad.servicios)
  @JoinColumn({ name: 'especialidad_ID' }) // Vincula esta columna con el ID de Especialidad
  especialidad: Specialty;

  // Relación con la entidad Cama  ==> Codigo añadido
  @OneToMany(() => Cama, (cama) => cama.servicio)
  camas: Cama[]; // Esta propiedad establece la relación con la entidad Cama
}
