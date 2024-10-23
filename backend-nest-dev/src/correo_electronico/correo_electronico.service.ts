import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserCredentials(
    nombres: string,
    primer_apellido: string,
    segundo_nombre: string,
    email: string,
    nombre_usuario: string,
    contrasenia: string,
  ) {
    await this.mailerService.sendMail({
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