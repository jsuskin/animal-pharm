"use client";
import { useStore } from "@/app/store/useStore";
import FormInput from "@/app/components/NewProductForm/FormInput";
import { PlusIcon } from "@phosphor-icons/react";
import { createNewLotTransaction } from "@/actions/inventory";

export default function Page() {
  const scannedQueue = useStore((state) => state.scanner.queue);
  const updateQuantityInQueue = useStore((state) => state.updateQuantityInQueue);

  return (
    <div>
      <div className='w-full flex justify-center mt-4'>
        <p className='text-2xl m-8 text-slate-400'>REVIEW RECEIVING SHIPMENT</p>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          for (const item of scannedQueue) {
            const newLotTransaction = await createNewLotTransaction(
              "",
              "",
              +item.id!,
              new Date(),
              item.quantity!,
              "",
            );
            console.log("New Lot Transaction:", newLotTransaction);
          }
        }}
      >
        {scannedQueue.map((item, i) => (
          <div key={i} className='flex flex-col my-4'>
            <hr />
            <div className='my-3'>
              <FormInput
                type='number'
                label={`${item.displayName} (${item.value})`}
                value={item.quantity?.toString() ?? ""}
                setValue={(value) => {
                  updateQuantityInQueue(i, +value);
                }}
                placeholder='Quantity'
              />
              <FormInput
                type='number'
                label='Lot Number'
                value=''
                setValue={() => {}}
                placeholder='Enter Lot Number (Optional)'
              />
            </div>
            <button className='flex flex-col items-center mt-1 mb-2'>
              <PlusIcon size={20} />
              <span className='text-xs'>Add New Lot</span>
            </button>
          </div>
        ))}
        <button
          type='submit'
          disabled={scannedQueue.every((item) => !item.quantity)}
          className='fixed bottom-0 text-2xl bg-blue-300 p-5 w-full'
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}
