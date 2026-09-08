import {
  EraserIcon,
  HandArrowDownIcon,
  HandArrowUpIcon,
  IconWeight,
  TrashIcon,
} from "@phosphor-icons/react";
import Link from "next/link";

export default function InventoryActionButton({
  mode,
  active,
  delay,
}: {
  mode: "RECEIVE" | "DISPENSE" | "ADJUST" | "WASTE";
  active: boolean;
  delay: 0 | 20 | 40 | 80;
}) {
  const iconProps = { size: 20, weight: "bold" as IconWeight };

  return (
    <div
      className={`${active ? "translate-y-0 translate-x-0 pointer-events-auto" : "translate-y-100 translate-x-100 pointer-events-none"} transition-transform duration-200 delay-[${delay}ms]`}
    >
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
    </div>
  );
}
