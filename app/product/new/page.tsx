"use client";
import { insertProduct } from "@/actions/inventory";
import FormInput from "@/app/components/NewProductForm/FormInput";
import { useStore } from "@/app/store/useStore";
import { getNewProductFormURL } from "@/utils/helperMethods";
import { createClient } from "@/utils/supabase/client";
import type { Product, ScanFormat } from "@/utils/types";
import { XIcon } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

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
  const updateNameAndIdInQueue = useStore((state) => state.updateNameAndIdInQueue);
  const scannedQueue = useStore((state) => state.scanner.queue);
  const scannerActive = useStore((state) => state.scanner.active);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !sku) return;

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

    const { data, error } = await insertProduct(newProduct);

    if (error) {
      console.error(error);
      return;
    }

    addProduct(newProduct);

    const queueIndex = scannedQueue.findIndex((item) => item.value === scanResult);

    updateNameAndIdInQueue(queueIndex, data.id, data.name);

    if (scannerActive) {
      router.push("/");
      return;
    }

    const nextNewItem = scannedQueue.find((item) => !item.id);

    router.push(
      nextNewItem
        ? getNewProductFormURL(scanResult, scanFormat as ScanFormat)
        : "/inventory/review",
    );
  };

  return (
    <div className='relative bg-black w-full h-screen'>
      <button
        onClick={() => {
          router.push("/");
        }}
        className='absolute right-0 top-0 m-6'
      >
        <XIcon size={48} className='text-slate-400' />
      </button>
      <div className='w-full flex justify-center mt-16'>
        <p className='text-3xl m-8 text-slate-400'>{scanResult}</p>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3 my-6'>
        <FormInput label='Name' value={name} setValue={setName} />
        <FormInput label='Manufacturer' value={manufacturer} setValue={setManufacturer} />
        <FormInput label='Min. Quantity' value={minimumQuantity} setValue={setMinimumQuantity} />
        <FormInput label='Max. Quantity' value={maximumQuantity} setValue={setMaximumQuantity} />
        <FormInput label='Size' value={size} setValue={setSize} />
        <FormInput label='Dosage' value={dosage} setValue={setDosage} />
        <FormInput label='Type' value={type} setValue={setType} />
        <FormInput label='SKU' value={sku} setValue={setSku} />
        <FormInput label='Notes' value={notes} setValue={setNotes} />
        <button type='submit' className='fixed bottom-0 text-2xl bg-blue-300 p-5 w-full'>
          SUBMIT
        </button>
      </form>
    </div>
  );
}
