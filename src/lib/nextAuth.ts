import { AuthQuery, AuthHash } from '@/modules/auth/domain/ports/AuthPort';
import Credentials from 'next-auth/providers/credentials';
import { Users } from '@/modules/users/domain/entities/Users';
import { JWT } from 'next-auth/jwt';
import NextAuth, { Session } from 'next-auth';
import { AuthPrismaAdapter } from '@/modules/auth/infrastructure/prisma/AuthPrismaAdapter';
import { UsersPrismaAdapter } from '@/modules/users/infrastructure/prisma/UsersPrismaAdapter';
import { AuthArgon2Adapter } from '@/modules/auth/infrastructure/argon2/AuthArgon2Adapter';
import { AuthLoginCase } from '@/modules/auth/application/AuthUseCases';

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
const authLoginCase = new AuthLoginCase(authQuery, authHash);

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

          if (typeof username === 'string' && typeof password === 'string') {
            const user = await authLoginCase.login(username, password);
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
