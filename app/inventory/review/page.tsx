"use client";
import { useStore } from "@/app/store/useStore";
import { PlusIcon } from "@phosphor-icons/react";
import { createDispenseTransaction, createNewLotTransaction } from "@/actions/inventory";
import LotReviewFields from "./LotReviewFields";
import Separator from "@/app/components/Separator";
import { useRouter } from "next/navigation";

export default function Page() {
  const scanMode = useStore((state) => state.scanner.mode);
  const scannedQueue = useStore((state) => state.scanner.queue);
  const addNewEmptyLotObjectInQueue = useStore((state) => state.addNewEmptyLotObjectInQueue);

  const router = useRouter();

  const isDisabled = scannedQueue.some((item) =>
    scanMode === "RECEIVE" ? item.lots?.some((lot) => !lot.quantity) : !item.quantity,
  );

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (isDisabled) return;

    try {
      for (const item of scannedQueue) {
        if (!item) return;

        if (scanMode === "RECEIVE") {
          if (!item.lots) return;

          for (const lot of item.lots) {
            let expirationDate: string | null = null;

            if (lot.expirationDate) {
              const [expYear, expMonth] = lot.expirationDate.split("-").map(Number);

              if (expYear && expMonth) {
                const dateObj = new Date(expYear, expMonth, 0);

                if (!isNaN(dateObj.getTime())) expirationDate = dateObj.toISOString().split("T")[0];
              }
            }

            const source = "manufacturer"; // !!! TEMP !!!

            const newLotTransaction = await createNewLotTransaction(
              lot.lotNumber ?? "",
              expirationDate,
              +item.id!,
              new Date(),
              lot.quantity!,
              lot.note ?? "",
              scanMode!,
              source,
            );

            console.log("New Lot Transaction:", newLotTransaction);
          }
        } else {
          const newDispenseTransaction = await createDispenseTransaction(
            +item.id!,
            item.quantity!,
            scanMode!,
            item.note!,
          );

          console.log("New Dispense Transaction", newDispenseTransaction);
        }

        router.push("/");
      }
    } catch (error) {
      console.error("Failed to process transaction queue:", error);
      // maybe a toast or smth here
    }
  };

  return (
    <div>
      <div className='w-full flex justify-center mt-4'>
        <p className='text-2xl m-2 text-slate-400'>
          <span className='font-extrabold'>{scanMode}</span> Transaction Review
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        {scannedQueue.map((item, i) => (
          <div key={i} className='flex flex-col my-4'>
            <Separator />
            <h2 className='text-lg mx-5'>{`${item.displayName} (${item.value})`}</h2>
            {item.lots?.map((lot, j) => (
              <div key={j}>
                {j > 0 && <Separator variant='dark-center' />}
                <LotReviewFields
                  queueIndex={i}
                  lotIndex={j}
                  item={item}
                  lot={lot}
                  scanMode={scanMode}
                />
              </div>
            ))}
            {scanMode === "RECEIVE" && (
              <button
                className='flex flex-col items-center mt-1 mb-2'
                onClick={() => {
                  addNewEmptyLotObjectInQueue(i);
                }}
              >
                <PlusIcon size={20} />
                <span className='text-xs'>Add New Lot</span>
              </button>
            )}
          </div>
        ))}
        <div className='h-20' />
        <button
          type='submit'
          disabled={isDisabled}
          className='fixed bottom-0 text-2xl bg-blue-300 p-2 w-full 
            disabled:bg-slate-300 
            disabled:opacity-10 
            disabled:cursor-not-allowed 
            disabled:pointer-events-none'
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}
