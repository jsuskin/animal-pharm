import { Product, ScanFormat, ScannedItem } from "./types";

export const getNewProductFormURL = (scanResult: string, scanFormat: ScanFormat) => {
  const params = new URLSearchParams();
  params.set("result", scanResult);
  params.set("format", scanFormat);

  return `/product/new?${params.toString()}`;
};

export const findProductByScanResult = (
  inventory: Product[],
  scanResult: string,
  scanFormat: ScanFormat,
) =>
  inventory.find((product) => product[scanFormat === "ean_13" ? "upc" : "qr_code"] === scanResult);

export const packageScanResultForQueue = (
  scanResult: string,
  product: Product | undefined,
  scanFormat: ScanFormat,
) => ({
  value: scanResult,
  displayName: product
    ? `${product.manufacturer} ${product.name} ${product.dosage} ${product.size}`
    : scanResult,
  format: scanFormat,
  id: product?.id,
  quantity: null,
  note: null
});