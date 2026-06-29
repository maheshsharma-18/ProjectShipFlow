import { PrismaClient } from '@prisma/client';

let globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma: PrismaClient =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: [
      { emit: 'stdout', level: 'query' },
      { emit: 'stdout', level: 'error' },
      { emit: 'stdout', level: 'warn' }
    ]
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function withIdempotency<T>(key: string | undefined, fn: () => Promise<T>): Promise<T> {
  // Placeholder: rely on DB unique constraints and caller-provided key
  return await fn();
}
