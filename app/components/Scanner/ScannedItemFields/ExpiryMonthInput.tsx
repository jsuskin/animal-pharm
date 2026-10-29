import { useRef } from "react";
import { useStore } from "@/app/store/useStore";
import { ScannedItem } from "@/utils/types";

export default function ExpiryMonthInput({
  currentQueueIndex,
  currentLotIndex,
  currentItem,
}: {
  currentQueueIndex: number;
  currentLotIndex: number;
  currentItem: ScannedItem;
}) {
  const updateExpirationDateInLot = useStore((s) => s.updateExpirationDateInLot);
  const ref = useRef<HTMLInputElement>(null);

  const value = currentItem?.lots?.[currentLotIndex]?.expirationDate ?? "";
  const display = value
    ? new Date(value + "-1").toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "";

  const openPicker = () => {
    try {
      ref.current?.showPicker?.();
    } catch {
      // already open or not allowed; native behavior still works
    }
  };

  return (
    <div className='relative w-full border border-gray-400 p-2 focus-within:ring-1 focus-within:ring-gray-300'>
      <span className={display ? "text-white" : "text-gray-100/50"}>
        {display || "Expiration Date"}
      </span>
      <input
        ref={ref}
        type='month'
        value={value}
        onChange={(e) => {
          updateExpirationDateInLot(currentQueueIndex, currentLotIndex, e.target.value);
          ref.current?.blur();
        }}
        onClick={openPicker}
        onFocus={(e) => e.stopPropagation()}
        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
      />
    </div>
  );
}
