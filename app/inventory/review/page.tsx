"use client";
import { useStore } from "@/app/store/useStore";
import { useEffect } from "react";
import FormInput from "@/app/components/NewProductForm/FormInput";

export default function Page() {
  const scannedQueue = useStore((state) => state.scanner.queue);

  useEffect(() => {
    console.log("Queue:", scannedQueue);
  }, [scannedQueue]);

  return (
    <form>
      {scannedQueue.map((item) => (
        <FormInput
          type='number'
          key={item.value}
          label={`${item.displayName} (${item.value})`}
          value={item.quantity?.toString() ?? ""}
          setValue={(value: string) => {}}
          direction='col'
        />
      ))}
    </form>
  );
}
