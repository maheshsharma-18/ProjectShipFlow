import type { inferAsyncReturnType } from '@trpc/server';
import { prisma } from '@shipflow/db';
import { getServerSession } from '@shipflow/auth';

export async function createContext(opts?: { req?: Request }) {
  // For simplicity in non-Next env, pull workspace from header
  const workspaceId = opts?.req?.headers.get('x-workspace-id') ?? null;
  const session = await getServerSession();
  return { prisma, session, workspaceId };
}

export type Context = inferAsyncReturnType<typeof createContext>;
