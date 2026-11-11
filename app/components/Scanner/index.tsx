"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useZxing } from "react-zxing";
import { useStore } from "@/app/store/useStore";
import {
  findProductByScanResult,
  packageScanResultForQueue,
  selectBestBackCamera,
} from "@/utils/helperMethods";
import { ScanFormat, TransactionType } from "@/utils/types";
import ScannedQueue from "./ScannedQueue";
import ScannerControls from "./ScannerControls";
import ScannedItemFields from "./ScannedItemFields";
import { InfoIcon, SplitHorizontalIcon, XIcon } from "@phosphor-icons/react";
import Link from "next/link";
import ScanMode from "./ScanMode";
import InfoModal from "./InfoModal";

export default function Scanner() {
  const [hasCamera, setHasCamera] = useState(false);
  const [scanFormat, setScanFormat] = useState<ScanFormat>("ean_13");
  const [scanResult, setScanResult] = useState("");
  const [cameraId, setCameraId] = useState<string | null>(null);
  const [cameraSelectionComplete, setCameraSelectionComplete] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const inventory = useStore((state) => state.inventory);
  const scannerActive = useStore((state) => !!state.scanner.mode);
  const scannedQueue = useStore((state) => state.scanner.queue);
  const startScanner = useStore((state) => state.startScanner);
  const clearQueue = useStore((state) => state.clearQueue);
  const copyQueueToRecovery = useStore((state) => state.copyQueueToRecovery);
  const stopScanner = useStore((state) => state.stopScanner);
  const addToScannedQueue = useStore((state) => state.addToScannedQueue);

  const searchParams = useSearchParams();
  const scanMode = searchParams.get("action")?.toUpperCase() as TransactionType;

  const router = useRouter();

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

        navigator.vibrate(50);

        if (scanMode === "ADJUST") {
          if (!product) {
            setShowToast(true);
          } else {
            router.push(`/product/${product.id}`);
          }
          return;
        }

        const newItem = packageScanResultForQueue(result, product, scanFormat);

        setScanResult(result);
        addToScannedQueue(newItem);
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
      startScanner(scanMode);
    })();

    return () => {
      cancelled = true;
    };
  }, [startScanner, scanMode]);

  useEffect(() => {
    if (showToast) setTimeout(() => setShowToast(false), 3000);
  }, [showToast]);

  const pauseScanning = () => {
    copyQueueToRecovery();
    clearQueue();
    stopScanner();
  };

  return (
    <div className='fixed inset-0 z-[9999] w-screen h-screen bg-black'>
      {showInfoModal && <InfoModal closeModal={() => setShowInfoModal(false)} />}
      <div
        className='absolute bg-gray-700 top-15 left-1/2 -translate-x-1/2 p-3 w-80 rounded-sm z-9999 transition duration-300 ease-in-out'
        style={{ opacity: showToast ? "70%" : 0, pointerEvents: showToast ? "auto" : "none" }}
      >
        <p>Item not found. Please switch scan mode to RECEIVE or try again.</p>
      </div>
      {!isFullyReady ? (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-16 border-[#ccc] border-t-white border-8 rounded-[50%] animate-spin' />
      ) : (
        <>
          <ScanMode />
          <div className='absolute flex right-0 top-0 m-4 gap-4'>
            {/* <button>
              <SplitHorizontalIcon size={32} className='text-slate-400' />
            </button> */}
            <button onClick={() => setShowInfoModal((prev) => !prev)}>
              <InfoIcon size={32} className='text-slate-400' />
            </button>
            <Link href='/' onClick={pauseScanning}>
              <XIcon size={32} className='text-slate-400' />
            </Link>
          </div>
          {scanMode !== "ADJUST" && (
            <>
              <ScannedItemFields
                key={scanResult}
                scanResult={scanResult}
                setScanResult={setScanResult}
                scanMode={scanMode}
              />
              <ScannedQueue
                scanResult={scanResult}
                setScanResult={setScanResult}
                scanFormat={scanFormat}
              />
            </>
          )}
          <ScannerControls
            scanFormat={scanFormat}
            setScanFormat={setScanFormat}
            torch={torch}
            scanMode={scanMode}
          />
          <video ref={ref} muted playsInline className='w-full h-full object-cover' />
        </>
      )}
    </div>
  );
}
