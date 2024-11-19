/* eslint-disable prettier/prettier */
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Cambia esto si usas otro servicio SMTP
      port: 587,
      secure: false, // true para puerto 465, false para otros puertos
      auth: {
        user: 'mp2797598@gmail.com', // Configura las credenciales aquí o usa variables de entorno
        pass: 'qwpu heqb ckgi tsba',
      },
      tls: {
        rejectUnauthorized: false, // Ignorar certificados autofirmados
      },
    });
  }

  async sendUserCredentials(
    nombres: string,
    primer_apellido: string,
    segundo_nombre: string,
    email: string,
    nombre_usuario: string,
    contrasenia: string,
    telefono: number,
  ) {
    await this.transporter.sendMail({
      from: '"No Reply" <desarrollo.dev@example.com>',
      to: email,
      subject: 'Tus credenciales de acceso',
      text: `Hola ${nombres} ${primer_apellido} ${segundo_nombre},\n\nAquí están tus credenciales de acceso:\n\nUsuario: ${nombre_usuario}\nContraseña: ${contrasenia}\n\nPor favor, guarda esta información de manera segura.\n\nSaludos,`,
      html: `
        <p>Hola ${nombres} ${primer_apellido} ${segundo_nombre},</p>
        <p>Aquí están tus credenciales de acceso:</p>
        <ul>
          <li><strong>Usuario:</strong> ${nombre_usuario}</li>
          <li><strong>Contraseña:</strong> ${contrasenia}</li>
        </ul>
        <p>Por favor, guarda esta información de manera segura.</p>
        <p>Saludos, Equipo de desarrollo - Sedes</p>
      `,
    });
  }
}
