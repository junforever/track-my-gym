/**
 * Singleton Prisma Client
 */
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'production'
        ? ['error']
        : ['query', 'warn', 'error'],
    errorFormat: 'pretty', // Options: 'pretty', 'colorless', 'minimal'
  });

prisma.$extends({
  query: {
    async $allOperations({ model, operation, args, query }) {
      try {
        return await query(args);
      } catch (error) {
        const errorMsg = `Error capturado en middleware de prisma en ${
          operation || 'operación general'
        } en ${model || 'modelo general'}`;
        console.error(error);
        throw new Error(errorMsg);
      }
    },
  },
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
