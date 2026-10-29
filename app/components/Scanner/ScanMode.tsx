import { useStore } from "@/app/store/useStore";
import Link from "next/link";
import { useState } from "react";

const scanModes = ["RECEIVE", "DISPENSE", "WASTE", "ADJUST"];

export default function ScanMode() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scanMode = useStore((state) => state.scanner.mode);

  return (
    <div className='absolute top-0 left-0 m-4 w-34'>
      <button onClick={() => setMenuOpen(!menuOpen)}>
        <span
          className={`text-xl ${scanMode === "RECEIVE" ? "text-green-500" : scanMode === "DISPENSE" ? "text-yellow-200" : scanMode === "ADJUST" ? "text-blue-300" : "text-orange-700"} tracking-wider`}
        >
          {scanMode === "RECEIVE"
            ? "RECEIVING"
            : scanMode === "DISPENSE"
              ? "DISPENSING"
              : scanMode === "ADJUST"
                ? "ADJUSTING"
                : scanMode}
          <span className="after:content-[''] after:animate-ellipsis"></span>
        </span>
      </button>
      {menuOpen && (
        <ul className='text-xl tracking-wider bg-gray-500 z-99999'>
          {scanModes.map(
            (mode, i) =>
              scanMode !== mode && (
                <li key={i}>
                  <Link href={`/scan?action=${mode.toLowerCase()}`}>{mode}</Link>
                </li>
              ),
          )}
        </ul>
      )}
    </div>
  );
}
