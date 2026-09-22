import FormInput from "@/app/components/NewProductForm/FormInput";
import { useStore } from "@/app/store/useStore";
import { LotInput, ScannedItem, TransactionType } from "@/utils/types";
import LotDropdown from "./LotDropdown";

export default function LotReviewFields({
  queueIndex,
  lotIndex,
  item,
  lot,
  scanMode,
}: {
  queueIndex: number;
  lotIndex: number;
  item: ScannedItem;
  lot: LotInput;
  scanMode: TransactionType | null;
}) {
  // const updateQuantityInQueue = useStore((state) => state.updateQuantityInQueue);
  // const updateItemNoteInQueue = useStore((state) => state.updateItemNoteInQueue);
  const updateQuantityInLot = useStore((state) => state.updateQuantityInLot);
  const updateNoteInLot = useStore((state) => state.updateNoteInLot);
  const updateExpirationDateInLot = useStore((state) => state.updateExpirationDateInLot);
  const updateLotNumberInLot = useStore((state) => state.updateLotNumberInLot);

  return (
    <div className='my-3'>
      <FormInput
        type='number'
        label={`Lot ${lotIndex + 1} Quantity`}
        value={lot.quantity?.toString() ?? ""}
        setValue={(value) => {
          updateQuantityInLot(queueIndex, lotIndex, +value);
          // updateQuantityInQueue(queueIndex, +value);
        }}
        placeholder='Quantity'
      />
      {scanMode === "RECEIVE" ? (
        <FormInput
          type='number'
          label='Lot Number'
          value={lot.lotNumber ?? ""}
          setValue={(value) => {
            updateLotNumberInLot(queueIndex, lotIndex, value);
          }}
          placeholder='Enter Lot Number (Optional)'
        />
      ) : <LotDropdown productId={item.id} />}
      <FormInput
        type='month'
        label='Expiration Date'
        value={lot.expirationDate ?? ""}
        setValue={(value) => {
          updateExpirationDateInLot(queueIndex, lotIndex, value);
        }}
        customStyles='w-full'
      />
      <FormInput
        label='Note'
        value={lot.note ?? ""}
        setValue={(value) => {
          updateNoteInLot(queueIndex, lotIndex, value);
          // updateItemNoteInQueue(queueIndex, value);
        }}
        placeholder='Note (Optional)'
      />
    </div>
  );
}
