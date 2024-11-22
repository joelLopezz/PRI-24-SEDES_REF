import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,JoinColumn, NumericType } from 'typeorm';
import { Paciente } from '../paciente/paciente.entity';

@Entity('diagnosticos')
export class Diagnosticos{
    @PrimaryGeneratedColumn()
    diagnostico_ID: number;

    @Column({ type: 'varchar', length: 255 })
    diagnostico_presuntivo: string;

    @Column({ type: 'tinyint' })
    estado: number;

    @Column({ type: 'datetime' })
    fecha_creacion: Date;

    @Column({ type: 'datetime', nullable: true })
    fecha_modificacion: Date;


    @ManyToOne(() => Paciente, (paciente) => paciente.diagnostico)
    @JoinColumn({ name: 'paciente_paciente_ID' })  // Especificamos el nombre exacto de la clave foránea en la base de datos
    paciente: Paciente;

    
    // @ManyToOne(() => Paciente, (paciente) => paciente.diagnostico)
    // paciente:  Paciente;

    // Relación ManyToOne con Paciente
    // @ManyToOne(() => Paciente, (paciente) => paciente.diagnostico)
    // @JoinColumn({ name: 'ID_Paciente' })  // Aquí se especifica el nombre exacto de la columna
    // paciente: Paciente;

    
}