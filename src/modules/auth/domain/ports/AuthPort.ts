import { AuthResponse, AuthSession } from '@/modules/auth/domain/entities/Auth';
import { Users } from '@/modules/users/domain/entities/Users';

export interface AuthHash {
  validatePassword(hashedPassword: string, password: string): Promise<boolean>;
}

export interface AuthQuery {
  findUsersByUsername(username: string): Promise<Users | null>;
}

export interface AuthLogin {
  login(username: string, password: string): Promise<AuthResponse>;
}

export interface AuthLogout {
  logout(): Promise<void>;
}

export interface AuthActiveSession {
  activeSession(): Promise<AuthSession | null>;
}
