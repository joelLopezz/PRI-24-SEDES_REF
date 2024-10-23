import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './correo_electronico.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', // Cambia esto por el servicio SMTP que vayas a utilizar
        port: 587,
        auth: {
          user: 'mp2797598@gmail.com',
          pass: 'qwpu heqb ckgi tsba',
        },
      },
      defaults: {
        from: '"No Reply" <desarrollo.dev@example.com>',
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
