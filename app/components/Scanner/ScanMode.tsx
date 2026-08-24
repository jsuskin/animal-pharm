import { useStore } from "@/app/store/useStore";

export default function ScanMode() {
  const scanMode = useStore((state) => state.scanner.mode);

  return (
    <div className='absolute top-0 left-0 m-4'>
      <p
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
      </p>
    </div>
  );
}
