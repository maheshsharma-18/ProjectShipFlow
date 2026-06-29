import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('v1/orders')
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @Post()
  async create(@Body() body: any) {
    const order = await this.orders.create(body);
    return order;
  }

  @Get()
  async list() {
    return this.orders.list();
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.orders.get(id);
  }
}
