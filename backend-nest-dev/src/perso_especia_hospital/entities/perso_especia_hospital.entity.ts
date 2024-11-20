import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PersonalSalud } from 'src/personal_salud/personal_salud.entity';
import { Specialty } from 'src/specialty/specialty.entity';
import { EstablecimientoSalud } from 'src/establecimiento/establecimiento.entity';

@Entity('Personal_Especialidad_Hospital') // Nombre de la tabla en la base de datos
export class PersoEspeciaHospital {
  @PrimaryGeneratedColumn()
  idPersonal_Especialidad_Hospital: number;

  @ManyToOne(() => PersonalSalud, (personalSalud) => personalSalud.personalEspecialidadHospital)
  @JoinColumn({ name: 'Personal_salud_id' }) // Nombre exacto de la columna en la base de datos
  personal_salud: PersonalSalud;

  @ManyToOne(() => Specialty, (especialidad) => especialidad.personalEspecialidad)
  @JoinColumn({ name: 'Especialidad_id' }) // Nombre exacto de la columna en la base de datos
  especialidad: Specialty;

  @ManyToOne(() => EstablecimientoSalud, (hospital) => hospital.personalEspecialidadHospital)
  @JoinColumn({ name: 'Hospital_id' }) // Nombre exacto de la columna en la base de datos
  hospital: EstablecimientoSalud;
}
