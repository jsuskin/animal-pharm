"use client";
import { useEffect, useState } from "react";
import { useZxing } from "react-zxing";
import { useStore } from "@/app/store/useStore";
import {
  findProductByScanResult,
  packageScanResultForQueue,
  selectBestBackCamera,
} from "@/utils/helperMethods";
import { ScanFormat } from "@/utils/types";
import ScannedQueue from "./ScannedQueue";
import ScannerControls from "./ScannerControls";
import ScannedItemFields from "./ScannedItemFields";
import { XIcon } from "@phosphor-icons/react";
import Link from "next/link";

export default function Scanner() {
  const [hasCamera, setHasCamera] = useState(false);
  const [scanFormat, setScanFormat] = useState<ScanFormat>("ean_13");
  const [scanResult, setScanResult] = useState("");
  const [cameraId, setCameraId] = useState<string | null>(null);
  const [cameraSelectionComplete, setCameraSelectionComplete] = useState(false);

  const inventory = useStore((state) => state.inventory);
  const scannerActive = useStore((state) => state.scanner.active);
  const scannedQueue = useStore((state) => state.scanner.queue);
  const startScanner = useStore((state) => state.startScanner);
  const stopScanner = useStore((state) => state.stopScanner);

  const addToScannedQueue = useStore((state) => state.addToScannedQueue);

  const isFullyReady = scannerActive && cameraSelectionComplete;

  const { ref, torch } = useZxing({
    paused: !scannerActive || !cameraSelectionComplete,
    constraints: cameraId
      ? { video: { deviceId: { exact: cameraId } } }
      : { video: { facingMode: "environment" } }, // fallback if detection fails
    timeBetweenDecodingAttempts: 750,
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

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const id = await selectBestBackCamera();

      if (cancelled) return;

      setCameraId(id);
      setCameraSelectionComplete(true);
      startScanner();
    })();

    return () => {
      cancelled = true;
      stopScanner();
    };
  }, [startScanner, stopScanner]);

  return (
    <div className='fixed inset-0 z-[9999] w-screen h-screen bg-black'>
      {!isFullyReady && (
        <div className='absolute inset-0 bg-neutral-900 flex items-center justify-center z-10'>
          <p className='text-white text-sm'>Initializing camera...</p>
        </div>
      )}
      <Link href='/'>
        <div className='absolute right-0 top-0 m-4'>
          <XIcon size={32} className='text-slate-400' />
        </div>
      </Link>
      <ScannedItemFields scanResult={scanResult} setScanResult={setScanResult} />
      <ScannerControls scanFormat={scanFormat} setScanFormat={setScanFormat} torch={torch} />
      <ScannedQueue scanResult={scanResult} setScanResult={setScanResult} scanFormat={scanFormat} />
      <video ref={ref} muted playsInline className='w-full h-full object-cover' />
    </div>
  );
}
