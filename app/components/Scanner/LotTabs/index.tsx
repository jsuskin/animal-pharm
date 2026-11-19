import { LotTabActionButton } from "./LotTabActionButton";
import { useStore } from "@/app/store/useStore";
// import { useEffect } from "react";
// import VConsole from "vconsole";

export default function LotTabs({
  currentLotIndex,
  setCurrentLotIndex,
  numLots,
}: {
  currentLotIndex: number;
  setCurrentLotIndex: (idx: number) => void;
  numLots: number;
}) {
  const addNewEmptyLotObjectInQueue = useStore((state) => state.addNewEmptyLotObjectInQueue);
  const removeLastLotObjectInQueue = useStore((state) => state.removeLastLotObjectInQueue);
  const currentQueueIndex = useStore((state) => state.scanner.currentQueueIndex);

  const getLotTabBorderColor = (i: number) => (currentLotIndex === i ? "green" : "gray");

  // useEffect(() => {
  //   const vConsole = new VConsole();

  //   return () => vConsole.destroy();
  // }, []);

  return (
    <ul className='absolute flex top-14 left-5 gap-0.5'>
      {numLots > 1 && (
        <LotTabActionButton
          icon='minus'
          handleClick={() => {
            removeLastLotObjectInQueue(currentQueueIndex);
            if (numLots - 1 === currentLotIndex) setCurrentLotIndex(currentLotIndex - 1);
          }}
        />
      )}
      {[...Array(numLots)].map((_, i) => (
        <li
          key={i}
          className={`flex justify-center items-center border border-${getLotTabBorderColor(i)}-400 border-b-transparent text-${getLotTabBorderColor(i)}-400 rounded-t-md p-2 w-14 h-7`}
        >
          <button
            onClick={() => {
              setCurrentLotIndex(i);
            }}
          >
            <span className='text-xs'>Lot {i + 1}</span>
          </button>
        </li>
      ))}
      {!!numLots && (
        <LotTabActionButton
          icon='plus'
          handleClick={() => {
            addNewEmptyLotObjectInQueue(currentQueueIndex); // Add new lot to queue
            setCurrentLotIndex(numLots); // Set current lot index to that lot
          }}
        />
      )}
    </ul>
  );
}
