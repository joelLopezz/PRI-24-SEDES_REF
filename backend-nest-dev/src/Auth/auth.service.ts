// auth.service.ts
import { Injectable } from '@nestjs/common';

export interface DataUser {
  usuarioID: number;
  nombre: string;
  rol: string;
  establecimientoID: number;
}

@Injectable()
export class AuthService {
  private currentUser:DataUser | null = null;

  login(user: DataUser) {
    // Almacenar la información del usuario logueado
    this.currentUser = user;
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
}
