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