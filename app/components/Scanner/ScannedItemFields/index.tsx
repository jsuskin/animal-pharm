import { useState } from "react";
import { useStore } from "@/app/store/useStore";
import LotTabs from "../LotTabs";
import { CheckIcon, XIcon } from "@phosphor-icons/react";
import ExpiryMonthInput from "./ExpiryMonthInput";
import { TransactionType } from "@/utils/types";

export default function ScannedItemFields({
  scanResult,
  setScanResult,
  scanMode,
}: {
  scanResult: string;
  setScanResult: (result: string) => void;
  scanMode: TransactionType;
}) {
  const [currentLotIndex, setCurrentLotIndex] = useState(0);
  const [codeInput, setCodeInput] = useState(""); // For manual input

  const scannedQueue = useStore((state) => state.scanner.queue);
  const updateQuantityInLot = useStore((state) => state.updateQuantityInLot);
  const updateQuantityInQueue = useStore((state) => state.updateQuantityInQueue);
  const updateNoteInLot = useStore((state) => state.updateNoteInLot);
  const updateLotNumberInLot = useStore((state) => state.updateLotNumberInLot);
  const currentQueueIndex = useStore((state) => state.scanner.currentQueueIndex);

  const currentItem = scannedQueue[currentQueueIndex];
  const numLots = currentItem?.lots?.length ?? 0;

  const quantity =
    (scanMode === "RECEIVE"
      ? currentItem?.lots![currentLotIndex]?.quantity?.toString()
      : currentItem?.quantity) ?? "";

  const setQuantity = (e: React.ChangeEvent<HTMLInputElement>) =>
    scanMode === "RECEIVE"
      ? updateQuantityInLot(currentQueueIndex, currentLotIndex, +e.target.value)
      : updateQuantityInQueue(currentQueueIndex, +e.target.value);

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
            value={codeInput.length ? codeInput : (scanResult ?? currentItem.value)}
            onChange={(e) => setCodeInput(e.target.value)}
          />
          <div
            className={`absolute ${codeInput.length ? "flex" : "hidden"} items-center top-0 right-0 mx-4 gap-3 h-full`}
          >
            <button
              className='text-green-500'
              onClick={() => {
                setScanResult(codeInput);
                setCodeInput("");
              }}
            >
              <CheckIcon size={24} weight='bold' />
            </button>
            <button className='text-red-500' onClick={() => setCodeInput("")}>
              <XIcon size={24} weight='bold' />
            </button>
          </div>
        </div>
        {!!scanResult.length && (
          <>
            <input
              type='number'
              className='border border-gray-400 p-2 text-white w-full'
              value={quantity}
              onChange={setQuantity}
              placeholder='Quantity'
            />
            <input
              className='border border-gray-400 p-2 text-white w-full'
              value={currentItem?.lots![currentLotIndex]?.lotNumber ?? ""}
              onChange={(e) => {
                updateLotNumberInLot(currentQueueIndex, currentLotIndex, e.target.value);
              }}
              placeholder='Lot Number'
            />
            <ExpiryMonthInput
              currentQueueIndex={currentQueueIndex}
              currentLotIndex={currentLotIndex}
              currentItem={currentItem}
            />
            <input
              className='border border-gray-400 p-2 text-white w-full'
              placeholder='Note'
              value={currentItem?.lots![currentLotIndex]?.note ?? ""}
              onChange={(e) => updateNoteInLot(currentQueueIndex, currentLotIndex, e.target.value)}
            />
          </>
        )}
      </div>
    </section>
  );
}
