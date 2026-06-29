import { Injectable } from '@nestjs/common';
import { prisma } from '@shipflow/db';
import { OrderCreateSchema } from '@shipflow/shared/src/schemas';

@Injectable()
export class OrdersService {
  async create(input: unknown) {
    const parsed = OrderCreateSchema.parse(input);
    const order = await prisma.order.create({
      data: {
        toAddress: parsed.toAddress as any,
        fromAddress: parsed.fromAddress as any,
        parcel: parsed.parcel as any,
        idempotencyKey: parsed.idempotencyKey || null
      }
    });
    return order;
  }
  async list() {
    return prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
  }
  async get(id: string) {
    return prisma.order.findUnique({ where: { id } });
  }
}
