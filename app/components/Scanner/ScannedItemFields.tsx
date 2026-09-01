import { useState } from "react";
import { useStore } from "@/app/store/useStore";
import LotTabs from "./LotTabs";
import { CheckIcon, XIcon } from "@phosphor-icons/react";

export default function ScannedItemFields({
  scanResult,
  setScanResult,
}: {
  scanResult: string;
  setScanResult: (result: string) => void;
}) {
  const [currentLotIndex, setCurrentLotIndex] = useState(0);
  const [codeInput, setCodeInput] = useState(""); // For manual input

  const scannedQueue = useStore((state) => state.scanner.queue);
  const updateQuantityInLot = useStore((state) => state.updateQuantityInLot);
  const updateNoteInLot = useStore((state) => state.updateNoteInLot);
  const updateLotNumberInLot = useStore((state) => state.updateLotNumberInLot);
  const updateExpirationDateInLot = useStore((state) => state.updateExpirationDateInLot);
  const currentQueueIndex = useStore((state) => state.scanner.currentQueueIndex);

  const numLots = scannedQueue[currentQueueIndex]?.lots?.length ?? 0;

  return (
    <section>
      <LotTabs
        currentLotIndex={currentLotIndex}
        setCurrentLotIndex={setCurrentLotIndex}
        numLots={numLots}
      />
      <div className='absolute flex flex-col left-1/2 -translate-x-1/2 w-full gap-1 p-3 top-18'>
        <div className='relative'>
          <input
            className='border border-gray-400 p-2 text-white w-full'
            placeholder='UPC/QR Code'
            value={codeInput.length ? codeInput : scanResult ?? scannedQueue[currentQueueIndex].value}
            onChange={(e) => {
              setCodeInput(e.target.value)
            }}
          />
          <div className={`absolute ${codeInput.length ? "flex" : "hidden"} items-center top-0 right-0 mx-4 gap-3 h-full`}>
            <button className="text-green-500" onClick={() => {
              setScanResult(codeInput);
              setCodeInput("");
            }}>
              <CheckIcon size={24} weight="bold" />
            </button>
            <button className="text-red-500" onClick={() => {
              setCodeInput("");
            }}>
              <XIcon size={24} weight="bold" />
            </button>
          </div>
        </div>
        {!!scanResult.length && (
          <>
            <input
              type='number'
              className='border border-gray-400 p-2 text-white w-full'
              value={
                scannedQueue[currentQueueIndex]?.lots![currentLotIndex]?.quantity?.toString() ?? ""
              }
              onChange={(e) => {
                updateQuantityInLot(currentQueueIndex, currentLotIndex, +e.target.value);
              }}
              placeholder='Quantity'
            />
            <input
              className='border border-gray-400 p-2 text-white w-full'
              value={scannedQueue[currentQueueIndex]?.lots![currentLotIndex]?.lotNumber ?? ""}
              onChange={(e) => {
                updateLotNumberInLot(currentQueueIndex, currentLotIndex, e.target.value);
              }}
              placeholder='Lot Number'
            />
            <input
              className='border border-gray-400 p-2 text-white w-full'
              value={scannedQueue[currentQueueIndex]?.lots![currentLotIndex]?.expirationDate ?? ""}
              onChange={(e) => {
                updateExpirationDateInLot(currentQueueIndex, currentLotIndex, e.target.value);
              }}
              placeholder='Expiration Date'
            />
            <input
              className='border border-gray-400 p-2 text-white w-full'
              placeholder='Note'
              value={scannedQueue[currentQueueIndex]?.lots![currentLotIndex]?.note ?? ""}
              onChange={(e) => {
                updateNoteInLot(currentQueueIndex, currentLotIndex, e.target.value);
              }}
            />
          </>
        )}
      </div>
    </section>
  );
}
