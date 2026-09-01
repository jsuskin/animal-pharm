export type Product = {
  id?: string;
  name: string;
  manufacturer: string | null;
  size: string | null;
  dosage: string | null;
  type: string | null;
  minimum_quantity: number | null;
  maximum_quantity: number | null;
  sku: string;
  notes: string | null;
  upc: string | null;
  qr_code: string | null;
};

export type ScanFormat = "ean_13" | "qr_code";

export type ScannedItem = {
  value: string;
  displayName: string;
  format: ScanFormat;
  id: string | undefined;
  quantity?: number | null;
  note?: string | null;
  lots?: LotInput[];
};

export type LotInput = {
  lotNumber: string | null;
  expirationDate: string | null;
  quantity: number | null;
  note: string | null;
}

export type TransactionType = "RECEIVE" | "DISPENSE" | "WASTE" | "ADJUST";

