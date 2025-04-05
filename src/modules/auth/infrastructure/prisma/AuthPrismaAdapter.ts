import { Users } from '@/modules/users/domain/entities/Users';
import { UsersPrismaAdapter } from '@/modules/users/infrastructure/prisma/UsersPrismaAdapter';
import { AuthQuery } from '@/modules/auth/domain/ports/AuthPort';

export class AuthPrismaAdapter implements AuthQuery {
  constructor(private usersPrisma: UsersPrismaAdapter) {}

  async findUsersByUsername(username: string): Promise<Users | null> {
    return await this.usersPrisma.findUsersByUsername(username);
  }
}
