'use server';

import {
  AuthNextAuthLoginAdapter,
  AuthNextAuthLogoutAdapter,
  AuthNextAuthActiveSessionAdapter,
} from '@/modules/auth/infrastructure/nextAuth/AuthNextAuthAdapter';
import { AuthResponse, AuthSession } from '@/modules/auth/domain/entities/Auth';
import {
  AuthLogout,
  AuthLogin,
  AuthActiveSession,
} from '@/modules/auth/domain/ports/AuthPort';
import {
  AuthActiveSessionCase,
  AuthLogoutCase,
} from '@/modules/auth/application/AuthUseCases';

const authLogin: AuthLogin = new AuthNextAuthLoginAdapter();
const authLogout: AuthLogout = new AuthNextAuthLogoutAdapter();
const authActiveSession: AuthActiveSession =
  new AuthNextAuthActiveSessionAdapter();

const authLogoutCase = new AuthLogoutCase(authLogout);
const authActiveSessionCase = new AuthActiveSessionCase(authActiveSession);

export async function handleLogin(
  username: string,
  password: string,
): Promise<AuthResponse> {
  try {
    await authLogin.login(username, password);
    return { ok: true };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, error: error.message };
    }
    return { ok: false, error: 'Error de inicio de sesión' };
  }
}

export async function handleLogout(): Promise<void> {
  return await authLogoutCase.logout();
}

export async function handleActiveSession(): Promise<AuthSession | null> {
  return await authActiveSessionCase.activeSession();
}
