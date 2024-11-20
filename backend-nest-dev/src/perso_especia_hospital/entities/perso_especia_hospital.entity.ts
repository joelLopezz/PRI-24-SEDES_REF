
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PersonalSalud } from 'src/personal_salud/personal_salud.entity';
import { Specialty } from 'src/specialty/specialty.entity';
import { EstablecimientoSalud } from 'src/establecimiento/establecimiento.entity';

@Entity('Personal_Especialidad_Hospital')
export class PersoEspeciaHospital {
  @PrimaryGeneratedColumn()
  idPersonal_Especialidad_Hospital: number;

  @ManyToOne(() => PersonalSalud, (personalSalud) => personalSalud.personalEspecialidadHospital)
  personal_salud: PersonalSalud;

  @ManyToOne(() => Specialty, (especialidad) => especialidad.personalEspecialidad)
  especialidad: Specialty;

  @ManyToOne(() => EstablecimientoSalud, (hospital) => hospital.personalEspecialidadHospital)
  hospital: EstablecimientoSalud;
} 