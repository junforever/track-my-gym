import { AuthPort } from '@/modules/auth/domain/ports/AuthPort';
import { AuthResponse } from '@/modules/auth/domain/entities/Auth';
import { signIn, signOut, auth } from '@/lib/nextAuth';
import { AuthSession } from '@/modules/auth/domain/entities/Auth';
import { CustomSession } from '@/lib/nextAuth';

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

  async ActiveSession(): Promise<AuthSession | null> {
    const session = (await auth()) as CustomSession;
    if (!session?.user) return null;

    return {
      id: session.user.id,
      username: session.user.username,
      role: session.user.role,
      email: session.user.email,
    };
  }
}
