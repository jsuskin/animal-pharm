import { useStore } from "@/app/store/useStore";
import Link from "next/link";
import { PencilIcon, XIcon } from "@phosphor-icons/react";
import { getNewProductFormURL } from "@/utils/helperMethods";
import { ScanFormat } from "@/utils/types";

export default function ScannedQueue({
  scanResult,
  setScanResult,
  scanFormat,
}: {
  scanResult: string;
  setScanResult: (result: string) => void;
  scanFormat: ScanFormat;
}) {
  const removeFromScannedQueue = useStore((state) => state.removeFromScannedQueue);
  const scannedQueue = useStore((state) => state.scanner.queue);

  return (
    <ul className='flex flex-col fixed bottom-3 left-5 gap-1 w-70'>
      {scannedQueue.map((item, i) => (
        <li
          key={i}
          className={`
              flex items-center gap-2 text-lg 
              text-${item.id ? "green-300" : "yellow-200"}
            `}
        >
          <button
            onClick={() => {
              if (scannedQueue.slice(-1)[0].value === scanResult) setScanResult("");
              removeFromScannedQueue(i);
            }}
          >
            <XIcon size={28} />
          </button>
          {!item.id && (
            <Link href={getNewProductFormURL(scanResult, scanFormat)}>
              <PencilIcon size={28} />
            </Link>
          )}
          <button
            onClick={() => {
              setScanResult(item.value);
              navigator.vibrate(1);
              console.log("queue:",scannedQueue)
            }}
            className='text-left'
          >
            <p>{item.displayName}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
