'use server';

import { AuthNextAuthAdapter } from '@/modules/auth/infrastructure/nextAuth/AuthNextAuthAdapter';
import { AuthResponse, AuthSession } from '@/modules/auth/domain/entities/Auth';

const authAdapter = new AuthNextAuthAdapter();

export async function handleLogin(
  username: string,
  password: string,
): Promise<AuthResponse> {
  try {
    return await authAdapter.Login(username, password);
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, error: error.message };
    }
    return { ok: false, error: 'Error de inicio de sesión' };
  }
}

export async function handleLogout(): Promise<void> {
  return authAdapter.Logout();
}

export async function handleActiveSession(): Promise<AuthSession | null> {
  return authAdapter.ActiveSession();
}
