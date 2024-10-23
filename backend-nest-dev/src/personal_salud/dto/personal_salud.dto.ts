// src/personal_salud/dto/create-personal-salud.dto.ts

export class CreatePersonalSaludDto {
    nombres: string;
    primer_apellido: string;
    segundo_nombre: string;
    ci: string;
    matricula_profesional: string;
    sexo: string;
    cargo: string;
    correo_electronico: string;
    establecimiento_salud_idestablecimiento_ID: number;
    estado: number;
    rol: string;  // Este es el rol que pertenece al usuario
  }
  