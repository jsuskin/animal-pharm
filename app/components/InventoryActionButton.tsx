import { HandArrowDownIcon, HandArrowUpIcon } from "@phosphor-icons/react";
import { useStore } from "../store/useStore";

export default function InventoryActionButton({
  mode,
}: {
  mode: "RECEIVE" | "DISPENSE";
}) {
  const startScanner = useStore(state => state.startScanner);

  return (
    <button
      onClick={startScanner}
      className='flex justify-end items-center py-2 px-3 bg-blue-200 rounded-xl text-3xl text-black font-bold gap-2'
    >
      <span>{mode}</span>
      {mode === "RECEIVE" ? (
        <HandArrowDownIcon size={32} weight='bold' />
      ) : (
        <HandArrowUpIcon size={32} weight='bold' />
      )}
    </button>
  );
}
