import { AuthResponse } from '@/modules/auth/domain/entities/Auth';
import { AuthPort } from '@/modules/auth/domain/ports/AuthPort';

export class AuthUseCases {
  constructor(private authPort: AuthPort) {}

  async login(username: string, password: string): Promise<AuthResponse> {
    return await this.authPort.Login(username, password);
  }

  async logout(): Promise<void> {
    await this.authPort.Logout();
  }
}
