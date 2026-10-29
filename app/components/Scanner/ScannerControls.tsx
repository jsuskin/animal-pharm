import { useState } from "react";
import { useStore } from "@/app/store/useStore";
import {
  BarcodeIcon,
  CheckIcon,
  ClipboardIcon,
  FlashlightIcon,
  QrCodeIcon,
  SwapIcon,
} from "@phosphor-icons/react";
import { useZxing } from "react-zxing";
import { ScanFormat } from "@/utils/types";
import { useRouter } from "next/navigation";
import { getNewProductFormURL } from "@/utils/helperMethods";
import { useKeyboardDetection } from "@/hooks/useKeyboardDetection";

export default function ScannerControls({
  scanFormat,
  setScanFormat,
  torch,
  scanMode,
}: {
  scanFormat: ScanFormat;
  setScanFormat: (format: ScanFormat) => void;
  torch: ReturnType<typeof useZxing>["torch"];
  scanMode: "RECEIVE" | "DISPENSE" | "WASTE" | "ADJUST";
}) {
  const [torchEnabled, setTorchEnabled] = useState(false);

  const scannedQueue = useStore((state) => state.scanner.queue);
  const recoveryQueue = useStore((state) => state.scanner.recovery);
  const swapQueueAndRecovery = useStore((state) => state.swapQueueAndRecovery);
  // const stopScanner = useStore((state) => state.stopScanner);

  const isKeyboardOpen = useKeyboardDetection();

  const router = useRouter();

  const handleSubmitScannedItems = () => {
    const nextNewItem = scannedQueue.find((item) => !item.id);

    router.push(
      nextNewItem
        ? getNewProductFormURL(nextNewItem.value, nextNewItem.format)
        : "/inventory/review",
    );
  };

  return (
    <div className='flex absolute flex-col gap-3 bottom-5 right-5'>
      {/* 

        ░▒▓████████▓▒░▒▓███████▓▒░░▒▓███████▓▒░        ░▒▓███████▓▒░░▒▓██████▓▒░ ░▒▓██████▓▒░░▒▓███████▓▒░  
        ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
        ░▒▓██████▓▒░ ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░       ░▒▓██████▓▒░░▒▓█▓▒░      ░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░ 
        ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░             ░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
        ░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░       ░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
                                                                                       
      */}
      {scannedQueue.length && scanMode !== "ADJUST" ? (
        <button
          className='flex justify-center rounded-md p-1 transition duration-300 ease-out'
          onClick={handleSubmitScannedItems}
          onMouseDown={(e) => {
            e.preventDefault();
            handleSubmitScannedItems();
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            handleSubmitScannedItems();
          }}
          style={{
            transform: isKeyboardOpen ? "translateY(-260px)" : "translateY(0px)",
            backgroundColor: isKeyboardOpen ? "#93c5fd" : "transparent",
            width: isKeyboardOpen ? "342px" : "auto",
          }}
        >
          {isKeyboardOpen ? (
            <span className='text-xl'>Complete Scanning</span>
          ) : (
            <CheckIcon size={40} />
          )}
        </button>
      ) : (
        <></>
      )}
      {/* 

        ░▒▓███████▓▒░░▒▓████████▓▒░▒▓██████▓▒░ ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓███████▓▒░        ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░ 
        ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░     ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        
        ░▒▓███████▓▒░░▒▓██████▓▒░░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒▒▓█▓▒░░▒▓██████▓▒░ ░▒▓███████▓▒░       ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓██████▓▒░ ░▒▓█▓▒░░▒▓█▓▒░▒▓██████▓▒░   
        ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░     ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▓█▓▒░ ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        
        ░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓██████▓▒░ ░▒▓██████▓▒░   ░▒▓██▓▒░  ░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░       ░▒▓██████▓▒░ ░▒▓██████▓▒░░▒▓████████▓▒░░▒▓██████▓▒░░▒▓████████▓▒░ 
                                                                                                             ░▒▓█▓▒░                                                         
                                                                                                              ░▒▓██▓▒░                                                      
      */}
      {/* {recoveryQueue.length > 0 ? (
        <button onClick={swapQueueAndRecovery}>
          <ClipboardIcon size={40} />
        </button>
      ) : ( */}
      {recoveryQueue.length > 0 ? (
        !!scannedQueue.length && !!recoveryQueue.length ? (
          <div className='grid grid-cols-2'>
            <button className='row-start-1 col-start-1' onClick={swapQueueAndRecovery}>
              <ClipboardIcon size={25} />
            </button>
            <button
              className='row-start-2 col-start-2'
              onClick={() => {
                // MERGE QUEUES
              }}
            >
              <SwapIcon size={25} />
            </button>
          </div>
        ) : (
          <button onClick={swapQueueAndRecovery}>
            <ClipboardIcon size={40} />
          </button>
        )
      ) : (
        <></>
      )}
      {/* 

      ░▒▓████████▓▒░▒▓██████▓▒░ ░▒▓██████▓▒░ ░▒▓██████▓▒░░▒▓█▓▒░      ░▒▓████████▓▒░      ░▒▓██████████████▓▒░ ░▒▓██████▓▒░░▒▓███████▓▒░░▒▓████████▓▒░ 
          ░▒▓█▓▒░  ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        
          ░▒▓█▓▒░  ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒▒▓███▓▒░▒▓█▓▒▒▓███▓▒░▒▓█▓▒░      ░▒▓██████▓▒░        ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓██████▓▒░   
          ░▒▓█▓▒░  ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        
          ░▒▓█▓▒░   ░▒▓██████▓▒░ ░▒▓██████▓▒░ ░▒▓██████▓▒░░▒▓████████▓▒░▒▓████████▓▒░      ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░░▒▓███████▓▒░░▒▓████████▓▒░ 
      
      */}
      <button
        onClick={() => {
          setScanFormat(scanFormat === "ean_13" ? "qr_code" : "ean_13");
        }}
      >
        {scanFormat === "ean_13" ? <BarcodeIcon size={40} /> : <QrCodeIcon size={40} />}
      </button>
      {/* 
      
      ░▒▓████████▓▒░▒▓██████▓▒░░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░ 
         ░▒▓█▓▒░  ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
         ░▒▓█▓▒░  ░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░░▒▓█▓▒░      ░▒▓████████▓▒░ 
         ░▒▓█▓▒░  ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
         ░▒▓█▓▒░   ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░ 
      
      */}
      <button
        onClick={() => {
          const torchOn = !torchEnabled;
          setTorchEnabled(torchOn);
          torch[torchOn ? "on" : "off"]();
        }}
      >
        <FlashlightIcon size={40} weight={torchEnabled ? "fill" : "regular"} />
      </button>
    </div>
  );
}
