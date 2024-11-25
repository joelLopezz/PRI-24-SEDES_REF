import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('red_cordinacion')
export class RedCordinacion {
  @PrimaryGeneratedColumn({ type: 'tinyint' })
  red_ID: number;

  @Column({ type: 'varchar', length: 65, unique: true }) // Agrega unique: true
  nombre: string;

  @Column({ type: 'char', length: 6 })
  numeracion: string;

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
}
