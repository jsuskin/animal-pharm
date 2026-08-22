import { insertProduct } from "@/actions/inventory";
import { useStore } from "@/app/store/useStore";
import { getNewProductFormURL, packageScanResultForQueue } from "@/utils/helperMethods";
import type { Product, ScanFormat } from "@/utils/types";
import { useState } from "react";
import FormInput from "./NewProductForm/FormInput";
import { useRouter, useSearchParams } from "next/navigation";

export default function NewProductForm({ scanResult }: { scanResult: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();

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

    const packaged = packageScanResultForQueue(scanResult, newProduct, scanFormat as ScanFormat);

    updateNameAndIdInQueue(queueIndex, data.id, packaged.displayName);

    if (scannerActive) {
      router.push("/");
      return;
    }

    const nextNewItem = scannedQueue.find((item) => !item.id && item.value !== scanResult);

    router.push(
      nextNewItem
        ? getNewProductFormURL(nextNewItem.value, nextNewItem.format)
        : "/inventory/review",
    );
  };

  return (
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
      <button
        type='submit'
        disabled={!name.length || !manufacturer.length}
        className='fixed bottom-0 text-2xl bg-blue-300 p-5 w-full 
          disabled:bg-slate-300 
          disabled:opacity-50 
          disabled:cursor-not-allowed 
          disabled:pointer-events-none'
      >
        SUBMIT
      </button>
    </form>
  );
}
