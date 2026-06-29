import { Worker, QueueEvents, JobsOptions } from 'bullmq';
import { prisma } from '@shipflow/db';
import { createShippoAdapter } from '@shipflow/integrations';

const connection = { url: process.env.REDIS_URL || 'redis://localhost:6379' };
const shippo = createShippoAdapter(process.env.SHIPPO_API_KEY || 'test');

const defaultOpts: JobsOptions = { attempts: 5, backoff: { type: 'exponential', delay: 2000 } };

new Worker('shipment-purchase', async job => {
  const { shipmentId, orderId } = job.data as { shipmentId: string; orderId: string };
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new Error('Order not found');
  const res = await shippo.purchaseLabel({
    orderId,
    toAddress: (order as any).toAddress || {},
    fromAddress: (order as any).fromAddress || {},
    parcel: (order as any).parcel || {}
  });
  await prisma.shipment.update({ where: { id: shipmentId }, data: { status: 'PURCHASED', trackingNumber: res.trackingNumber, labelUrl: res.labelUrl, carrier: 'SHIPPO' as any, purchasedAt: new Date() } });
}, { connection });

new Worker('tracking-refresh', async job => {
  const { trackingNumber, carrier } = job.data as { trackingNumber: string; carrier: string };
  const info = await shippo.getTracking(trackingNumber, carrier);
  for (const evt of info.events) {
    await prisma.trackingEvent.upsert({
      where: {
        carrier_trackingNumber_eventId: { carrier: 'SHIPPO', trackingNumber: info.trackingNumber, eventId: evt.id }
      },
      update: {},
      create: {
        shipmentId: (await prisma.shipment.findFirstOrThrow({ where: { trackingNumber: info.trackingNumber } })).id,
        carrier: 'SHIPPO' as any,
        trackingNumber: info.trackingNumber,
        eventId: evt.id,
        status: evt.status as any,
        description: evt.description || null,
        location: evt.location || null,
        occurredAt: new Date(evt.occurredAt)
      }
    });
  }
}, { connection });

new QueueEvents('shipment-purchase', { connection });
new QueueEvents('tracking-refresh', { connection });

console.log('Worker started');
