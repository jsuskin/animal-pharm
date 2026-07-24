"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { XIcon } from "@phosphor-icons/react";
import FormInput from "@/app/components/NewProductForm/FormInput";
import { createClient } from "@/utils/supabase/client";
import { useStore } from "@/app/store/useStore";
import type { Product } from "@/utils/types";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Params
  const scanResult = searchParams.get("result") || "";
  const scanFormat = searchParams.get("format") || "ean_13";

  // Local State
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [size, setSize] = useState("");
  const [dosage, setDosage] = useState("");
  const [type, setType] = useState("");
  const [minimumQuantity, setMinimumQuantity] = useState("");
  const [maximumQuantity, setMaximumQuantity] = useState("");
  const [sku, setSku] = useState("");
  const [notes, setNotes] = useState("");

  // Global State
  const addProduct = useStore((state) => state.addProduct);

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
        <p className='text-3xl m-8'>{scanResult}</p>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log("submit");

          if (!name || !sku) return;

          const supabase = await createClient();

          const newProduct: Product = {
            name,
            manufacturer,
            size,
            dosage,
            type,
            minimum_quantity: +minimumQuantity,
            maximum_quantity: +maximumQuantity,
            sku,
            notes,
            upc: scanFormat === "ean_13" ? scanResult : null,
            qr_code: scanFormat === "qr_code" ? scanResult : null,
          };

          const { data } = await supabase.from("products").insert(newProduct).select();

          addProduct(newProduct);

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
