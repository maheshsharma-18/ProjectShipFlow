import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createContext } from './context';

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session?.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  if (!ctx.workspaceId) {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'No active workspace' });
  }
  return next({ ctx });
});
