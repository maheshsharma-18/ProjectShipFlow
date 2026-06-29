import { Controller, Get } from '@nestjs/common';
import { prisma } from '@shipflow/db';
import IORedis from 'ioredis';

@Controller()
export class HealthController {
  private redis = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');

  @Get('healthz')
  async health() {
    return { ok: true };
  }

  @Get('readyz')
  async ready() {
    await prisma.$queryRaw`SELECT 1`;
    await this.redis.ping();
    return { ok: true };
  }
}
