import { z } from 'zod';

export const AddressSchema = z.object({
  name: z.string().optional(),
  line1: z.string().min(1),
  line2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  postal: z.string().min(1),
  country: z.string().min(2),
  phone: z.string().optional()
});

export const ParcelSchema = z.object({
  lengthCm: z.number().positive(),
  widthCm: z.number().positive(),
  heightCm: z.number().positive(),
  weightGr: z.number().int().positive()
});

export const OrderCreateSchema = z.object({
  toAddress: AddressSchema,
  fromAddress: AddressSchema,
  parcel: ParcelSchema,
  idempotencyKey: z.string().optional()
});

export const ShipmentCreateSchema = z.object({
  orderId: z.string().min(1),
  idempotencyKey: z.string().optional()
});

export const ShipmentDTO = z.object({
  id: z.string(),
  orderId: z.string(),
  status: z.enum(['PENDING', 'PURCHASED', 'IN_TRANSIT', 'DELIVERED', 'EXCEPTION', 'CANCELLED']),
  trackingNumber: z.string().nullable(),
  labelUrl: z.string().nullable()
});

export const TrackingEventDTO = z.object({
  id: z.string(),
  status: z.enum(['PENDING', 'PURCHASED', 'IN_TRANSIT', 'DELIVERED', 'EXCEPTION', 'CANCELLED']),
  description: z.string().nullable(),
  location: z.string().nullable(),
  occurredAt: z.string()
});

export const ErrorEnvelope = z.object({
  error: z.object({
    message: z.string(),
    code: z.string().optional()
  })
});

export const Pagination = z.object({
  limit: z.number().int().min(1).max(100).default(20),
  cursor: z.string().optional()
});

export type Address = z.infer<typeof AddressSchema>;
export type Parcel = z.infer<typeof ParcelSchema>;
export type OrderCreate = z.infer<typeof OrderCreateSchema>;
export type ShipmentCreate = z.infer<typeof ShipmentCreateSchema>;
export type Shipment = z.infer<typeof ShipmentDTO>;
export type TrackingEvent = z.infer<typeof TrackingEventDTO>;
