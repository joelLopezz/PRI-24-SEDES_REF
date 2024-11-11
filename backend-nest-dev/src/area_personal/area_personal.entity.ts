import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { PersonalSalud } from '../personal_salud/personal_salud.entity';
  
  @Entity('area_personal_salud')
  export class AreaPersonal {
    @PrimaryGeneratedColumn()
    area_personal_salud_ID: number;
  
    @ManyToOne(() => PersonalSalud, (personalSalud) => personalSalud.areas)
    @JoinColumn({ name: 'personal_salud_personal_ID' })
    personalSalud: PersonalSalud;
    
  
    @Column({ type: 'varchar', length: 250, default: 'S/A' })
    area: string;

    @Column({ type: 'date', nullable: true })
    fecha: Date;
  }
  
