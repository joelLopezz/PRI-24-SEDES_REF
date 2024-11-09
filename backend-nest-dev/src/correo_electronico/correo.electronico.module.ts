/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MailService } from './correo_electronico.service';

@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
