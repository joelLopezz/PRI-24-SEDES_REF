import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('personal_salud')
export class PersonalSalud {
  @PrimaryGeneratedColumn()
  personal_ID: number;

  @Column({ type: 'varchar', length: 70 })
  nombres: string;

  @Column({ type: 'varchar', length: 45 })
  primer_apellido: string;

  @Column({ type: 'varchar', length: 45 })
  segundo_nombre: string;

  @Column({ type: 'varchar', length: 12 })
  ci: string;

  @Column({ type: 'varchar', length: 60 })
  matricula_profesional: string;

  @Column({ type: 'char', length: 1 })
  sexo: string;

  @Column({ type: 'varchar', length: 50 })
  cargo: string;

  @Column({type: 'varchar', length: 100})
  correo_electronico: string;

  @Column({ type: 'int' })
  usuario_usuario_ID: number;

  @Column({ type: 'int' })
  establecimiento_salud_idestablecimiento_ID: number;

  @Column({ type: 'tinyint', default: 1 })
  estado: number;

  @CreateDateColumn({ type: 'datetime' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  fecha_modificacion: Date;

  // @Column({ type: 'timestamp', nullable: true })
  // fecha_modificacion: Date;

}
