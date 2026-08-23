import { Product, ScanFormat } from "./types";

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
  note: null,
});

export async function selectBestBackCamera() {
  console.log("selecting best back camera...");
  const cached = localStorage.getItem("preferredBackCameraId");
  const devices = await navigator.mediaDevices.enumerateDevices();

  if (cached && devices.some((d) => d.deviceId === cached))
    if (devices.some((d) => d.deviceId === cached)) return cached;

  const videoInputs = devices.filter((d) => d.kind === "videoinput");

  let best = null;
  let bestScore = -1;

  for (const device of videoInputs) {
    let stream;

    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: device.deviceId } },
        audio: false,
      });

      const track = stream.getVideoTracks()[0];

      const caps = track.getCapabilities?.() ?? {};
      const settings = track.getSettings?.() ?? {};

      const facingBack =
        settings.facingMode === "environment" || (caps.facingMode ?? []).includes("environment");

      if (!facingBack) continue;

      let score = 0;
      if ("torch" in caps) score += 1000; // strongest signal: main sensor w/ flash
      if (caps.width?.max) score += caps.width.max; // tiebreak: higher-res sensor

      if (score > bestScore) {
        bestScore = score;
        best = device.deviceId;
      }
    } catch(err) {
      console.warn("could not test camera:", device.deviceId, err);
    } finally {
      stream?.getTracks().forEach((t) => t.stop());
    }
  }

  if (best) localStorage.setItem("preferredBackCameraId", best);

  return best; // null if nothing matched — caller should fall back to facingMode
}
