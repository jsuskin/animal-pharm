"use client";
import FormInput from "@/app/components/NewProductForm/FormInput";
import { XIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createNewLotTransaction } from "@/actions/inventory";

export default function Page() {
  const [lotNumber, setLotNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [receivedDate, setReceivedDate] = useState<Date | null>(null);
  const [note, setNote] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const slug = pathname.split("/")[2];

  return (
    <div className='absolute top-0 left-0 bg-black w-full h-screen z-999'>
      <button
        onClick={() => {
          router.push("/");
        }}
        className='absolute right-0 top-0 m-6'
      >
        <XIcon size={48} color='white' />
      </button>
      <div className='w-full flex justify-center mt-24'>
        <p className='text-3xl m-8'>NEW LOT FORM</p>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          if (!lotNumber.length || !expirationDate.length || !quantity.length) return;

          createNewLotTransaction(lotNumber, expirationDate, +slug, receivedDate, +quantity, note);
        }}
        className='flex flex-col gap-3 my-6'
      >
        <FormInput label='Lot Number' value={lotNumber} setValue={setLotNumber} />
        <FormInput
          label='Expiration Date'
          value={expirationDate}
          setValue={setExpirationDate}
          type='date'
          customStyles='w-[64%] text-base shadow-sm focus:border-gray-900 focus:outline-solid focus:ring-2 focus:ring-white [&-webkit-calendar-picker-indicator]:hidden [&-webkit-clear-button]:hidden [&-webkit-inner-spin-button]:hidden'
        />
        <FormInput label='Quantity' value={quantity} setValue={setQuantity} />
        <button type='submit' className='fixed bottom-0 text-2xl bg-blue-300 p-5 w-full'>
          SUBMIT
        </button>
      </form>
    </div>
  );
}
