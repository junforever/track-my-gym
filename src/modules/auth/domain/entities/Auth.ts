import { UsersSchema } from '@/modules/users/domain/entities/Users';
import { z } from 'zod';

export const AuthCredentials = UsersSchema.pick({
  username: true,
  password: true,
}).extend({
  username: z.string().nonempty({ message: 'Username cannot be empty' }),
  password: z.string().nonempty({ message: 'Password cannot be empty' }),
});

export type Auth = z.infer<typeof AuthCredentials>;

export type AuthResponse = {
  ok: boolean;
  error?: undefined | string;
};
