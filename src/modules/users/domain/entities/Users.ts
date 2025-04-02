import { users as PrismaUser } from '@prisma/client';
export type Users = PrismaUser;

export type CreateUserData = Omit<Users, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateUserData = Partial<Omit<Users, 'createdAt' | 'updatedAt'>>;
