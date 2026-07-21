import { useState } from "react";
import { XIcon } from "@phosphor-icons/react";
import FormInput from "./FormInput";
import { createClient } from "@/utils/supabase/client";

export default function NewProductForm({
  result,
  setResult,
}: {
  result: string;
  setResult: (result: string) => void;
}) {
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [size, setSize] = useState("");
  const [dosage, setDosage] = useState("");
  const [type, setType] = useState("");
  const [minimumQuantity, setMinimumQuantity] = useState("");
  const [maximumQuantity, setMaximumQuantity] = useState("");
  const [sku, setSku] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <div className='absolute top-0 left-0 bg-black w-full h-screen z-999'>
      <button
        onClick={() => {
          setResult("");
        }}
        className='absolute right-0 top-0 m-6'
      >
        <XIcon size={48} color='white' />
      </button>
      <div className='w-full flex justify-center mt-24'>
        <p className='text-3xl m-8'>{result}</p>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log("submit");

          if (!name || !sku) return;

          const supabase = await createClient();

          const { data } = await supabase
            .from("products")
            .insert({
              name,
              manufacturer,
              size,
              dosage,
              type,
              minimum_quantity: minimumQuantity,
              maximum_quantity: maximumQuantity,
              sku,
              notes,
              upc: result,
            })
            .select();

          console.log("Data:", data);
        }}
        className='flex flex-col gap-3 my-6'
      >
        <FormInput label='Name' value={name} setValue={setName} />
        <FormInput label='Manufacturer' value={manufacturer} setValue={setManufacturer} />
        <FormInput label='Min. Quantity' value={minimumQuantity} setValue={setMinimumQuantity} />
        <FormInput label='Max. Quantity' value={maximumQuantity} setValue={setMaximumQuantity} />
        <FormInput label='Size' value={size} setValue={setSize} />
        <FormInput label='Dosage' value={dosage} setValue={setDosage} />
        <FormInput label='Type' value={type} setValue={setType} />
        <FormInput label='SKU' value={sku} setValue={setSku} />
        <FormInput label='Notes' value={notes} setValue={setNotes} />
        <input type='submit' />
      </form>
    </div>
  );
}
