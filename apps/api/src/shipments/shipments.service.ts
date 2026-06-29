import { Injectable } from '@nestjs/common';
import { prisma } from '@shipflow/db';
import { ShipmentCreateSchema } from '@shipflow/shared/src/schemas';
import { Queue } from 'bullmq';

@Injectable()
export class ShipmentsService {
  private purchaseQueue: Queue;

  constructor() {
    this.purchaseQueue = new Queue('shipment-purchase', { connection: { url: process.env.REDIS_URL || 'redis://localhost:6379' } });
  }

  async create(input: unknown) {
    const parsed = ShipmentCreateSchema.parse(input);
    const order = await prisma.order.findUnique({ where: { id: parsed.orderId } });
    if (!order) throw new Error('Order not found');
    const shipment = await prisma.shipment.create({ data: { orderId: order.id, status: 'PENDING', idempotencyKey: parsed.idempotencyKey || null } });
    await this.purchaseQueue.add('purchase', { shipmentId: shipment.id, orderId: order.id }, { jobId: parsed.idempotencyKey || shipment.id, attempts: 5, backoff: { type: 'exponential', delay: 2000 } });
    return shipment;
  }

  async get(id: string) {
    return prisma.shipment.findUnique({ where: { id }, include: { trackingEvents: true } });
  }
}
