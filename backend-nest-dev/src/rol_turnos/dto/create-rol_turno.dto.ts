export class CreateRolTurnoDto {
    fecha: Date;
  
    personal_salud_personal_ID: number;
  
    establecimiento_salud_idestablecimiento_ID: number;
  
    especialidad_especialidad_ID: number;
  
    codificacion_codificacion_turno_ID: number;
  
    estado?: number; // Opcional, ya que tiene un valor por defecto
  
    usuario_creacion: number;
  }
