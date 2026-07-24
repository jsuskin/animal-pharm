"use client";
import { useState } from "react";
import { BarcodeIcon, CheckIcon, FlashlightIcon, QrCodeIcon } from "@phosphor-icons/react";
import { useZxing } from "react-zxing";

export default function Scanner({
  scannerActive,
  setScannerActive,
  setScanResult,
  scanFormat,
  setScanFormat
}: {
  scannerActive: boolean;
  setScannerActive: (isEnabled: boolean) => void;
  setScanResult: (result: string) => void;
  scanFormat: "ean_13" | "qr_code";
  setScanFormat: (scanFormat: "ean_13" | "qr_code") => void;
}) {
  const [hasCamera, setHasCamera] = useState(false);
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [manualUpcInput, setManualUpcInput] = useState("");
  

  const { ref, torch } = useZxing({
    paused: !scannerActive,
    onDecodeResult(decodedResult) {
      const format = decodedResult.format;
      
      if (format === scanFormat) {
        const result = decodedResult.rawValue;

        setScanResult(result);
        setScannerActive(false);
        setTorchEnabled(false);
        torch.off();
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
      <form
        className='absolute flex left-1/2 -translate-x-1/2 mt-10'
        onSubmit={() => {
          setScanResult(manualUpcInput);
        }}
      >
        <input
          className='border border-gray-400 bg-white p-2 text-black'
          value={manualUpcInput}
          onChange={(e) => {
            setManualUpcInput(e.target.value);
          }}
          placeholder='Enter UPC Manually Here'
        />
        <button type='submit' className='bg-gray-400 p-3'>
          <CheckIcon size={24} weight='bold' />
        </button>
      </form>
      <div className='flex absolute flex-col gap-6 bottom-20 right-10'>
        <button onClick={() => {
          setScanFormat(scanFormat === 'ean_13' ? "qr_code" : "ean_13");
        }}>
          {scanFormat === "ean_13" ? <BarcodeIcon size={54} /> : <QrCodeIcon size={54} />}
        </button>
        <button
          onClick={() => {
            const torchOn = !torchEnabled;
            setTorchEnabled(torchOn);
            if (torchOn) {
              torch.on();
            } else {
              torch.off();
            }
          }}
        >
          <FlashlightIcon size={54} weight={torchEnabled ? "fill" : "regular"} />
        </button>
      </div>
      <video ref={ref} muted playsInline className='w-full h-full object-cover' />
    </div>
  );
}
