export type PurchaseLabelInput = {
  orderId: string;
  toAddress: any;
  fromAddress: any;
  parcel: any;
  idempotencyKey?: string;
};

export type PurchaseLabelResult = {
  shipmentId: string;
  trackingNumber: string;
  labelUrl: string;
  carrier: string;
};

export type TrackingInfo = {
  trackingNumber: string;
  carrier: string;
  status: string;
  events: Array<{
    id: string;
    status: string;
    description?: string | null;
    location?: string | null;
    occurredAt: string;
  }>;
};

export interface CarrierAggregator {
  purchaseLabel(input: PurchaseLabelInput): Promise<PurchaseLabelResult>;
  getTracking(trackingNumber: string, carrier: string): Promise<TrackingInfo>;
}
