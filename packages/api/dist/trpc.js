import { initTRPC, TRPCError } from '@trpc/server';
const t = initTRPC.context().create();
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
