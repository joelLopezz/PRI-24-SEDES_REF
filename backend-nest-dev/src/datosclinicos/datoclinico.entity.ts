import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from '../paciente/paciente.entity';

@Entity('datosclinicos')
export class DatosClinicos {
    @PrimaryGeneratedColumn()
    dato_clinico_ID: number;

    @Column({ type: 'int' })
    frecuencia_cardiaca: number;

    @Column({ type: 'int' })
    frecuencia_respiratoria: number;

    @Column({ type: 'varchar', length: 10 })
    precion_arterial: string;

    @Column({ type: 'float' })
    temperatura: number;

    @Column({ type: 'int' })
    glasgow: number;

    @Column({ type: 'float' })
    saturacion_oxigeno: number;

    @Column({ type: 'float' })
    peso: number;

    @Column({ type: 'float' })
    talla: number;

    @Column({ type: 'float' })
    imc: number;

    // @Column({type:'int'})
    // paciente_paciente_ID: number;

    @Column({ type: 'tinyint' })
    estado: number;

    @Column({ type: 'datetime' })
    fecha_creacion: Date;

    @Column({ type: 'datetime', nullable: true })
    fecha_modificacion: Date;

    // Relación ManyToOne con Paciente
    @ManyToOne(() => Paciente, (paciente) => paciente.datosClinicos)
    @JoinColumn({ name: 'paciente_paciente_ID' })  // Aquí especificas el nombre correcto de la clave foránea
    paciente: Paciente;
}
