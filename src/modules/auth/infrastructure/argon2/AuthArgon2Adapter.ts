import { AuthHash } from '@/modules/auth/domain/ports/AuthPort';
import argon2 from 'argon2';

export class AuthArgon2Adapter implements AuthHash {
  async validatePassword(
    hashedPassword: string,
    password: string,
  ): Promise<boolean> {
    try {
      return await argon2.verify(hashedPassword, password);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error de validación de contraseña');
    }
  }
}
