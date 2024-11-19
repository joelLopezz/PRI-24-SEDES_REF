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
    // Almacenar la información del usuario logueado
    this.currentUser = user;
    //mostrar info
    this.logger.log(`Usuario logueado: ${user.nombre}`);
    //this.logger.log(`Usuario ID: ${user.usuarioID}`);
    //this.logger.log(`Establecimiento ID: ${user.establecimientoID}`);

    //this.logCurrentUser();
  }

  logout() {
    // Limpiar la información del usuario logueado
    this.currentUser = null;
  }

  getCurrentUser(): DataUser | null {
    // Retornar la información del usuario logueado
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    // Validar si el usuario está autenticado
    return this.currentUser !== null;
  }

  hasPermission(allowedRoles: string[]): boolean {
    // Validar si el usuario tiene uno de los roles permitidos
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
