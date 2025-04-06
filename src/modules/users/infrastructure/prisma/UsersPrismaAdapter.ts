import { UsersPort } from '@/modules/users/domain/ports/UsersPort';
import {
  Users,
  CreateUsersData,
  UpdateUsersData,
} from '@/modules/users/domain/entities/Users';
import { prisma } from '@/lib/prisma';

export class UsersPrismaAdapter implements UsersPort {
  async createUsers(user: CreateUsersData): Promise<Users> {
    return await prisma.users.create({ data: user });
  }

  async updateUsers(user: UpdateUsersData): Promise<Users> {
    return await prisma.users.update({
      where: { id: user.id },
      data: user,
    });
  }

  async deleteUsers(id: string): Promise<Users> {
    return await prisma.users.delete({ where: { id } });
  }

  async findUsersByUsername(username: string): Promise<Users | null> {
    try {
      return await prisma.users.findUnique({ where: { username } });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error al buscar el usuario');
    }
  }
  async findUsersById(id: string): Promise<Users | null> {
    return await prisma.users.findUnique({ where: { id } });
  }
  async findAllUsers(): Promise<Users[]> {
    return await prisma.users.findMany();
  }
}
