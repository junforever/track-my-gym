//import { users as PrismaUser } from '@prisma/client';
//export type Users = PrismaUser;
import { z } from 'zod';
// export type Users = {
//   id: string;
//   username: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   role: string;
//   status: string;
//   createdAt?: Date | null;
//   updatedAt?: Date | null;
// };

export const UsersSchema = z.object({
  id: z.string().uuid(),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(50, { message: 'Username must be at most 50 characters long' }),
  firstName: z
    .string()
    .min(1, { message: 'First name cannot be empty' })
    .max(100, { message: 'First name must be at most 100 characters long' }),
  lastName: z
    .string()
    .min(1, { message: 'Last name cannot be empty' })
    .max(100, { message: 'Last name must be at most 100 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
  role: z.string().refine((val) => ['admin', 'user', 'viewer'].includes(val), {
    message: 'Role must be one of: admin, user, viewer',
  }),
  status: z.string().refine((val) => ['active', 'inactive'].includes(val), {
    message: 'Status must be one of: active, inactive',
  }),
  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
});

export type Users = z.infer<typeof UsersSchema>;
export type CreateUserData = Omit<Users, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateUserData = Partial<Omit<Users, 'createdAt' | 'updatedAt'>>;
