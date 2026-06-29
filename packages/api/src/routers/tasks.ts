import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';

export const tasksRouter = router({
  list: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.prisma.task.findMany({
        where: { project: { workspaceId: ctx.workspaceId! } },
        orderBy: { order: 'asc' },
      });
    }),
  create: protectedProcedure
    .input(z.object({ projectId: z.string(), title: z.string(), description: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      // basic multitenant check
      const project = await ctx.prisma.project.findFirst({ where: { id: input.projectId, workspaceId: ctx.workspaceId! } });
      if (!project) throw new Error('Project not found');
      const order = await ctx.prisma.task.count({ where: { projectId: input.projectId } });
      return ctx.prisma.task.create({ data: { projectId: input.projectId, title: input.title, description: input.description, order } });
    }),
  reorder: protectedProcedure
    .input(z.object({ projectId: z.string(), orderedIds: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.findFirst({ where: { id: input.projectId, workspaceId: ctx.workspaceId! } });
      if (!project) throw new Error('Project not found');
      await ctx.prisma.$transaction(
        input.orderedIds.map((id, idx) =>
          ctx.prisma.task.update({ where: { id }, data: { order: idx } })
        )
      );
      return { ok: true };
    }),
});
