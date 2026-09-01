import { useState } from "react";
import { useStore } from "@/app/store/useStore";
import { BarcodeIcon, CheckIcon, FlashlightIcon, QrCodeIcon } from "@phosphor-icons/react";
import { useZxing } from "react-zxing";
import { ScanFormat } from "@/utils/types";
import { useRouter } from "next/navigation";
import { getNewProductFormURL } from "@/utils/helperMethods";

export default function ScannerControls({
  scanFormat,
  setScanFormat,
  torch,
}: {
  scanFormat: ScanFormat;
  setScanFormat: (format: ScanFormat) => void;
  torch: ReturnType<typeof useZxing>["torch"];
}) {
  const [torchEnabled, setTorchEnabled] = useState(false);

  const scannedQueue = useStore((state) => state.scanner.queue);
  const stopScanner = useStore((state) => state.stopScanner);

  const router = useRouter();

  return (
    <div className='flex absolute flex-col gap-3 bottom-5 right-5'>
      {scannedQueue.length ? (
        <button
          onClick={() => {
            const nextNewItem = scannedQueue.find((item) => !item.id);

            router.push(
              nextNewItem
                ? getNewProductFormURL(nextNewItem.value, nextNewItem.format)
                : "/inventory/review",
            );
          }}
        >
          <CheckIcon size={40} />
        </button>
      ) : (
        <></>
      )}
      <button
        onClick={() => {
          setScanFormat(scanFormat === "ean_13" ? "qr_code" : "ean_13");
        }}
      >
        {scanFormat === "ean_13" ? <BarcodeIcon size={40} /> : <QrCodeIcon size={40} />}
      </button>
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
