import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    usuario_ID:number;

    @Column({type:  'varchar', length: 50})
    nombre_usuario: string;

    @Column({type:   'varchar', length: 21})
    contrasenia: string;

    @Column({type:   'varchar', length: 20})
    rol: string;

    @Column({ type: 'tinyint' })
    estado: number;

    @Column({ type: 'datetime' })
    fecha_creacion: Date;

    @Column({ type: 'datetime', nullable: true })
    fecha_modificacion: Date;



}