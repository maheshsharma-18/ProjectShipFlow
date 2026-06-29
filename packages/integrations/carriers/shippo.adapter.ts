import type { CarrierAggregator, PurchaseLabelInput, PurchaseLabelResult, TrackingInfo } from './carrier-aggregator';

export class ShippoAdapter implements CarrierAggregator {
  constructor(private apiKey: string) {}

  async purchaseLabel(input: PurchaseLabelInput): Promise<PurchaseLabelResult> {
    // Minimal stub for now; integrate real Shippo later
    const pseudoTracking = `SHIPPO${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
    return {
      shipmentId: `shp_${input.orderId}`,
      trackingNumber: pseudoTracking,
      labelUrl: `https://example.com/label/${pseudoTracking}.pdf`,
      carrier: 'shippo'
    };
  }

  async getTracking(trackingNumber: string, carrier: string): Promise<TrackingInfo> {
    return {
      trackingNumber,
      carrier,
      status: 'IN_TRANSIT',
      events: [
        {
          id: `${trackingNumber}-evt-1`,
          status: 'IN_TRANSIT',
          description: 'Package processed',
          location: 'Facility',
          occurredAt: new Date().toISOString()
        }
      ]
    };
  }
}

export function createShippoAdapter(apiKey: string): CarrierAggregator {
  return new ShippoAdapter(apiKey);
}
