import { AuthResponse } from '../entities/Auth';
import { Users } from '@/modules/users/domain/entities/Users';
import { AuthSession } from '@/modules/auth/domain/entities/Auth';

export interface AuthPort {
  Login(username: string, password: string): Promise<AuthResponse>;
  Logout(): Promise<void>;
  ActiveSession(): Promise<AuthSession | null>;
}

export interface AuthHash {
  validatePassword(hashedPassword: string, password: string): Promise<boolean>;
}

export interface AuthQuery {
  findUsersByUsername(username: string): Promise<Users | null>;
}
