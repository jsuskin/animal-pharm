import { useState, useRef } from "react";
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
  const [expMonthInputType, setExpMonthInputType] = useState<"month" | "text">("text");
  const updateExpirationDateInLot = useStore((state) => state.updateExpirationDateInLot);
  const expMonthInputRef = useRef<HTMLInputElement>(null);

  const handleExpMonthInputFocus = () => {
    setExpMonthInputType("month");

    setTimeout(() => {
      if (expMonthInputRef.current && typeof expMonthInputRef.current.showPicker === "function") {
        expMonthInputRef.current.focus();
        expMonthInputRef.current.showPicker();
      }
    }, 0);
  };

  const handleExpMonthInputBlur = (value: string | null) => {
    if (!value) {
      setExpMonthInputType("text");
    }
  };

  return (
    <input
      ref={expMonthInputRef}
      className='border border-gray-400 p-2 text-white w-full'
      type={expMonthInputType}
      value={currentItem?.lots![currentLotIndex]?.expirationDate ?? ""}
      onChange={(e) => {
        updateExpirationDateInLot(currentQueueIndex, currentLotIndex, e.target.value);
      }}
      onFocus={handleExpMonthInputFocus}
      onBlur={() =>
        handleExpMonthInputBlur(
          currentItem?.lots![currentLotIndex]?.expirationDate,
        )
      }
      placeholder='Expiration Date'
    />
  );
}
