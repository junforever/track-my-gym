import { AuthQuery, AuthHash } from '@/modules/auth/domain/ports/AuthPort';
import Credentials from 'next-auth/providers/credentials';
import { Users } from '@/modules/users/domain/entities/Users';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';
import NextAuth from 'next-auth';
import { AuthPrismaAdapter } from '@/modules/auth/infrastructure/prisma/AuthPrismaAdapter';
import { UsersPrismaAdapter } from '@/modules/users/infrastructure/prisma/UsersPrismaAdapter';
import { AuthArgon2Adapter } from '@/modules/auth/infrastructure/argon2/AuthArgon2Adapter';

interface CustomToken extends JWT {
  id?: string;
  username?: string;
  role?: string;
  email?: string;
}

export interface CustomSession extends Session {
  user: {
    id?: string;
    username?: string;
    role?: string;
    email?: string;
    name?: string | null;
    image?: string | null;
  };
}

const authQuery: AuthQuery = new AuthPrismaAdapter(new UsersPrismaAdapter());
const authHash: AuthHash = new AuthArgon2Adapter();

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { username, password } = credentials;

          if (!username || !password) {
            throw new Error('Nombre de usuario y contraseña requeridos');
          }

          if (typeof username === 'string' && typeof password === 'string') {
            const user = await authQuery.findUsersByUsername(username);

            if (!user) {
              throw new Error('Usuario y/o contraseña incorrectos');
            }

            const isPasswordValid = await authHash.validatePassword(
              user.password,
              password,
            );

            if (!isPasswordValid) {
              throw new Error('Usuario y/o contraseña incorrectos');
            }

            return user;
          }

          throw new Error('Usuario y/o contraseña incorrectos');
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error('Error de autenticación');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60, // 8 hours
    updateAge: 4 * 60 * 60, // 4 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      const customToken = token as CustomToken;

      if (user) {
        const userData = user as unknown as Users;
        customToken.id = userData.id;
        customToken.username = userData.username;
        customToken.email = userData.email;
        customToken.role = userData.role;
      }
      return customToken;
    },
    async session({ session, token }) {
      const customSession = session as CustomSession;
      const customToken = token as CustomToken;
      if (customToken) {
        customSession.user = {
          ...customSession.user,
          id: customToken.id,
          username: customToken.username,
          email: customToken.email,
          role: customToken.role,
        };
      }
      return customSession;
    },
  },
});
