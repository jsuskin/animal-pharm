import { EraserIcon, HandArrowDownIcon, HandArrowUpIcon, IconWeight, TrashIcon } from "@phosphor-icons/react";
import { useStore } from "../store/useStore";
import Link from "next/link";

export default function InventoryActionButton({
  mode,
}: {
  mode: "RECEIVE" | "DISPENSE" | "ADJUST" | "WASTE";
}) {
  // const startScanner = useStore((state) => state.startScanner);

  const iconProps = { size: 20, weight: "bold" as IconWeight };

  return (
    // <button
    //   onClick={startScanner}
    //   className='flex justify-end items-center py-2 px-3 bg-blue-200 rounded-xl text-xl text-black font-bold gap-2'
    // >
    <Link href={`/scan?action=${mode.toLowerCase()}`}>
      <div className='flex justify-end items-center py-2 px-3 bg-blue-200 rounded-xl text-xl text-black font-bold gap-2'>
        <span>{mode}</span>
        {mode === "RECEIVE" ? (
          <HandArrowDownIcon {...iconProps} />
        ) : mode === "DISPENSE" ? (
          <HandArrowUpIcon {...iconProps} />
        ) : mode === "ADJUST" ? (
          <EraserIcon {...iconProps} />
        ) : (
          <TrashIcon {...iconProps} />
        )}
      </div>
    </Link>
    // </button>
  );
}
