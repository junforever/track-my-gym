import { AuthPort } from '@/modules/auth/domain/ports/AuthPort';
import { AuthResponse } from '@/modules/auth/domain/entities/Auth';
import { signIn, signOut } from '@/lib/nextAuth';

export class AuthNextAuthAdapter implements AuthPort {
  async Login(username: string, password: string): Promise<AuthResponse> {
    try {
      await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      return { ok: true };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error de inicio de sesión');
    }
  }

  async Logout(): Promise<void> {
    await signOut({ redirectTo: '/login' });
  }
}
