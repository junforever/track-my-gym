import { UsersPort } from '../domain/ports/UsersPort';
import {
  Users,
  CreateUserData,
  UpdateUserData,
} from '../domain/entities/Users';
import { prisma } from '@/lib/prisma';

export class PrismaUsersAdapter implements UsersPort {
  async createUser(user: CreateUserData): Promise<Users> {
    return await prisma.users.create({ data: user });
  }

  async updateUser(user: UpdateUserData): Promise<Users> {
    return await prisma.users.update({
      where: { id: user.id },
      data: user,
    });
  }

  async deleteUser(id: string): Promise<Users> {
    return await prisma.users.delete({ where: { id } });
  }

  async findUserByUsername(username: string): Promise<Users | null> {
    return await prisma.users.findUnique({ where: { username } });
  }

  async findUserById(id: string): Promise<Users | null> {
    return await prisma.users.findUnique({ where: { id } });
  }

  async findAllUsers(): Promise<Users[]> {
    return await prisma.users.findMany();
  }
}
