import { LotTabActionButton } from "./LotTabActionButton";
import { useStore } from "@/app/store/useStore";

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
  const currentQueueIndex = useStore((state) => state.scanner.currentQueueIndex);

  const getLotTabBorderColor = (i: number) => (currentLotIndex === i ? "green" : "gray");

  return (
    <ul className='absolute flex top-14 left-5 gap-0.5'>
      {numLots > 1 && (
        <LotTabActionButton
          icon='minus'
          handleClick={() => {
            // If current lot index is last index -> -1; else leave alone
            console.log("Remove Last Lot From Queue:", currentQueueIndex);
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
            setCurrentLotIndex(currentLotIndex + 1); // Set current lot index to that lot
          }}
        />
      )}
    </ul>
  );
}
