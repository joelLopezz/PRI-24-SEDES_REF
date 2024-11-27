import { Injectable, Logger } from '@nestjs/common';
import { authPlugins } from 'mysql2';
import { Usuario } from '../usuario/usuario.entity';

export interface DataUser {
  usuarioID: number;
  nombre: string;
  rol: string;
  establecimientoID: number;
}

@Injectable()
export class AuthService {
  private currentUser:DataUser | null = null;
  private readonly logger = new Logger(AuthService.name);

  login(user: DataUser) {
    this.currentUser = user;
    this.logger.log(`Usuario logueado: ${user.nombre}`);
  }

  logout() {
    this.currentUser = null;
  }

  getCurrentUser(): DataUser | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  hasPermission(allowedRoles: string[]): boolean {
    return this.currentUser ? allowedRoles.includes(this.currentUser.rol) : false;
  }



  // Método temporal para imprimir la inf obtenida
  private logCurrentUser(): void {
    if (this.currentUser) {
      this.logger.log(`Usuario Logueado: usuarioID = ${this.currentUser.usuarioID}, establecimientoID = ${this.currentUser.establecimientoID}`);
    } else {
      this.logger.warn('No hay un usuario actualmente logueado.');
    }
  }
}
