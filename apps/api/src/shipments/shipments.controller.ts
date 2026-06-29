import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';

@Controller('v1/shipments')
export class ShipmentsController {
  constructor(private readonly shipments: ShipmentsService) {}

  @Post()
  async create(@Body() body: any) {
    return this.shipments.create(body);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.shipments.get(id);
  }
}
