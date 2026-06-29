import { Controller, Post, Headers, Body } from '@nestjs/common';
import { prisma } from '@shipflow/db';
import crypto from 'crypto';

@Controller('v1/webhooks')
export class WebhooksController {
  @Post('shippo')
  async shippo(@Headers('x-shippo-signature') signature: string, @Body() body: any) {
    const secret = process.env.SHIPPO_WEBHOOK_SECRET || '';
    const computed = crypto.createHmac('sha256', secret).update(JSON.stringify(body)).digest('hex');
    if (signature !== computed) {
      return { ok: false };
    }
    const evtId = body?.data?.id || body?.id || crypto.randomUUID();
    await prisma.webhookEvent.upsert({
      where: { id: evtId },
      update: {},
      create: { id: evtId, payload: body as any }
    });
    return { ok: true };
  }
}
