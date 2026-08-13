"use client";
import { useState } from "react";
import { useZxing } from "react-zxing";
import { useStore } from "@/app/store/useStore";
import { findProductByScanResult, packageScanResultForQueue } from "@/utils/helperMethods";
import { ScanFormat } from "@/utils/types";
import ScannedQueue from "./ScannedQueue";
import ScannerControls from "./ScannerControls";
import ScannedItemFields from "./ScannedItemFields";

export default function Scanner() {
  const [hasCamera, setHasCamera] = useState(false);
  const [scanFormat, setScanFormat] = useState<ScanFormat>("ean_13");
  const [scanResult, setScanResult] = useState("");

  const inventory = useStore((state) => state.inventory);
  const scannerActive = useStore((state) => state.scanner.active);
  const scannedQueue = useStore((state) => state.scanner.queue);

  const addToScannedQueue = useStore((state) => state.addToScannedQueue);

  const { ref, torch } = useZxing({
    paused: !scannerActive,
    onDecodeResult(decodedResult) {
      const format = decodedResult.format;

      if (format === scanFormat) {
        const result = decodedResult.rawValue;

        if (scannedQueue.find((item) => item.value === result)) return;

        const product = findProductByScanResult(inventory, result, scanFormat);
        const newItem = packageScanResultForQueue(result, product, scanFormat);
        
        setScanResult(result);
        addToScannedQueue(newItem);

        navigator.vibrate(50);
      }
    },
    onError(err) {
      const errorObject = err as Error;

      if (errorObject.name === "NotFoundError" || errorObject.name === "DevicesNotFoundError") {
        setHasCamera(false);
      } else {
        console.error("Camera error:", errorObject);
      }
    },
  });

  return (
    <div className='absolute top-0 left-0 h-screen'>
      <ScannedItemFields scanResult={scanResult} setScanResult={setScanResult} />
      <ScannerControls scanFormat={scanFormat} setScanFormat={setScanFormat} torch={torch} />
      <ScannedQueue scanResult={scanResult} setScanResult={setScanResult} scanFormat={scanFormat} />
      <video ref={ref} muted playsInline className='w-full h-full object-cover' />
    </div>
  );
}
