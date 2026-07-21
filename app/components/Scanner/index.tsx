"use client";
import { useState } from "react";
import { BarcodeIcon, CheckIcon, FlashlightIcon } from "@phosphor-icons/react";
import { useZxing } from "react-zxing";

export default function Scanner({
  scannerActive,
  setScannerActive,
  setResult,
}: {
  scannerActive: boolean;
  setScannerActive: (isEnabled: boolean) => void;
  setResult: (result: string) => void;
}) {
  const [hasCamera, setHasCamera] = useState(false);
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [manualUpcInput, setManualUpcInput] = useState("");

  const { ref, torch } = useZxing({
    paused: !scannerActive,
    onDecodeResult(decodedResult) {
      const result = decodedResult.rawValue;
      setResult(result);
      if (result.length) {
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
          setResult(manualUpcInput);
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
        className='absolute bottom-20 right-10'
      >
        <FlashlightIcon size={48} weight={torchEnabled ? "fill" : "regular"} />
      </button>
      <video ref={ref} muted playsInline className='w-full h-full object-cover' />
    </div>
  );
}
