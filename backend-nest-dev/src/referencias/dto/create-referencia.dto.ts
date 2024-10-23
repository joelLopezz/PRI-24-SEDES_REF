export class CreateReferenciaDto {
  paciente: {
    Apellido_Paterno: string;
    Apellido_Materno: string;
    Nombres: string;
    CI: string;
    Fecha_Nacimiento: Date;
    Telefono: string;
    Domicilio: string;
    Historia_Clinica: string;
    Procedencia: string;
    Edad: number;
    Sexo: string;
  };

  acompanantes: {
    Nombre_Acompanante: string;
    Telefono_Acompaniante: string;
    Parentesco: string;
  }[];

  datosClinicos: {
    Frecuencia_Cardiaca: number;
    Frecuencia_Respiratoria: number;
    Precion_Arterial: string;
    Temperatura: number;
    Glasgow: number;
    Saturacion_Oxigeno: number;
    Peso: number;
    Talla: number;
    IMC: number;
  };

  diagnosticos: {
    Diagnostico_Presuntivo: string;
  }[];

  antecedentesObstetricos: {
    FUM: Date;
    FPP: Date;
    RPM: string;
    FCF: number;
    Maduracion_Pulmonar: number;
  };

  transferencia: {
    Fecha_Ingreso: Date;
    Motivo_Transferencia: string;
    Fecha_Envio: Date;
    ID_Establecimiento_Referente: number;
    ID_Establecimiento_Receptor: number;
  };

  referencia: {
    Motivo_Referencia: string;
    ID_Establecimiento_Referente: number;
    ID_Establecimiento_Receptor: number;
    Nombre_Contacto_Receptor: string;
    Medio_Comunicacion?: string;
  };
}
