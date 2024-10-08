import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('especialidad')
export class Specialty {
  @PrimaryGeneratedColumn({ name: 'especialidad_ID', type: 'smallint' })
  id: number;

  @Column({ type: 'varchar', length: 60 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'tinyint', default: 1 })
  estado: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  fecha_modificacion: Date;

  // Usuario que crea el registro (se establece como 1 por defecto temporalmente)
  @Column({ type: 'mediumint', nullable: false, default: 1 }) //borra el deafult cuando tengas el currwent user
  usuario_creacion: number;

  // Usuario que modifica el registro (puede ser null inicialmente)
  @Column({ type: 'mediumint', nullable: true })
  usuario_modificacion: number;
}
