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
}

interface CustomSession extends Session {
  user: {
    id?: string;
    username?: string;
    role?: string;
    name?: string | null;
    email?: string | null;
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
  cookies: {
    sessionToken: {
      name: '__Secure-next-auth.session-token',
      options: {
        httpOnly: true,
        secure: true,
        sameSite: 'strict', // none, lax
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      const customToken = token as CustomToken;

      if (user) {
        // Cast user to Users type if needed
        const userData = user as unknown as Users;
        customToken.id = userData.id;
        customToken.username = userData.username;
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
          role: customToken.role,
        };
      }
      return customSession;
    },
  },
});
