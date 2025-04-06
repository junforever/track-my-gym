import { Users } from '@/modules/users/domain/entities/Users';
import {
  AuthQuery,
  AuthHash,
  AuthLogout,
  AuthActiveSession,
} from '@/modules/auth/domain/ports/AuthPort';
import { AuthSession } from '@/modules/auth/domain/entities/Auth';

export class AuthLoginCase {
  constructor(private authQuery: AuthQuery, private authHash: AuthHash) {}

  async login(username: string, password: string): Promise<Users> {
    if (!username || !password) {
      throw new Error('Nombre de usuario y/o contraseña no pueden ser vacíos');
    }

    try {
      const user = await this.authQuery.findUsersByUsername(username);
      if (!user) {
        throw new Error('Usuario y/o contraseña incorrectos');
      }

      const isPasswordValid = await this.authHash.validatePassword(
        user.password,
        password,
      );
      if (!isPasswordValid) {
        throw new Error('Usuario y/o contraseña incorrectos');
      }

      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error de autenticación');
    }
  }
}

export class AuthLogoutCase {
  constructor(private authLogout: AuthLogout) {}
  async logout(): Promise<void> {
    return await this.authLogout.logout();
  }
}

export class AuthActiveSessionCase {
  constructor(private authActiveSession: AuthActiveSession) {}
  async activeSession(): Promise<AuthSession | null> {
    return await this.authActiveSession.activeSession();
  }
}
