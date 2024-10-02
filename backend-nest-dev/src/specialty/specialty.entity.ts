import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('specialty')
export class Specialty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  created_by: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  updated_by: string;

  @Column({ type: 'tinyint', default: 1 })
  status: number;
}
