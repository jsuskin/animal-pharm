import { useStore } from "@/app/store/useStore";

export default function ScannedItemFields({
  scanResult,
  setScanResult,
}: {
  scanResult: string;
  setScanResult: (result: string) => void;
}) {
  const scannedQueue = useStore((state) => state.scanner.queue);
  const updateQuantity = useStore((state) => state.updateQuantityInQueue);
  const updateNote = useStore((state) => state.updateItemNoteInQueue);

  const currentIndex = scannedQueue.findIndex((item) => item.value === scanResult);

  return (
    <section className='absolute flex flex-col left-1/2 -translate-x-1/2 w-full gap-1 p-3 top-14'>
      <input
        className='border border-gray-400 p-2 text-white w-full'
        placeholder='UPC/QR Code'
        value={scanResult}
        onChange={(e) => {
          setScanResult(e.target.value);
        }}
      />
      <input
        type='number'
        className='border border-gray-400 p-2 text-white w-full'
        value={scannedQueue[currentIndex]?.quantity?.toString() ?? ""}
        onChange={(e) => updateQuantity(currentIndex, +e.target.value)}
        placeholder='Quantity'
      />
      <input
        className='border border-gray-400 p-2 text-white w-full'
        placeholder='Note'
        value={scannedQueue[currentIndex]?.note ?? ""}
        onChange={(e) => updateNote(currentIndex, e.target.value)}
      />
    </section>
  );
}
