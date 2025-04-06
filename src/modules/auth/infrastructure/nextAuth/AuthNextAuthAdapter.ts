import {
  AuthActiveSession,
  AuthLogin,
  AuthLogout,
} from '@/modules/auth/domain/ports/AuthPort';
import { AuthResponse, AuthSession } from '@/modules/auth/domain/entities/Auth';
import { signIn, signOut, auth, CustomSession } from '@/lib/nextAuth';

export class AuthNextAuthLoginAdapter implements AuthLogin {
  async login(username: string, password: string): Promise<AuthResponse> {
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
}

export class AuthNextAuthLogoutAdapter implements AuthLogout {
  async logout(): Promise<void> {
    await signOut({ redirectTo: '/login' });
  }
}

export class AuthNextAuthActiveSessionAdapter implements AuthActiveSession {
  async activeSession(): Promise<AuthSession | null> {
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
