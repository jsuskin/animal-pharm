"use client";
import { useEffect, useState } from "react";
import { useStore } from "@/app/store/useStore";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { packageScanResultForQueue } from "@/utils/helperMethods";
import { PackageIcon } from "@phosphor-icons/react";
import { ProductWithQuantity } from "@/utils/types";
import Toast from "../components/Toast";

type Lot = {
  expiration_date: string;
  id: number;
  lot_number: string;
  quantity: number;
  received_date: string;
  source: string;
};

export default function ProductPageContent({ product }: { product: ProductWithQuantity }) {
  const [lots, setLots] = useState<Lot[]>([]);
  const [toastText, setToastText] = useState<string | null>(null);
  const addToQueue = useStore((state) => state.addToScannedQueue); // !!!NEED TO DECOUPLE QUEUE FROM SCANNER!!!
  const queue = useStore((state) => state.scanner.queue); // !!!NEED TO DECOUPLE QUEUE FROM SCANNER!!!

  if (!product) notFound();

  const supabase = createClient();

  useEffect(() => {
    (async () => {
      const { data: lots } = await supabase
        .from("lots_with_quantity")
        .select("*")
        .eq("product_id", product.id)
        .neq("source", "adjustment") // Exclude the ghost lot
        .gt("quantity", 0) // Don't offer empty lots
        .order("expiration_date", { ascending: true, nullsFirst: false });

      setLots(lots as Lot[]);
    })();
  }, [product, supabase]);

  return product ? (
    <div className='relative p-4'>
      <Toast text={toastText ?? ""} showToast={!!toastText} closeToast={() => setToastText(null)} />
      <p className='text-2xl italic m-2'>{product.manufacturer}</p>
      <p className='text-4xl m-2 font-extrabold'>{product.name}</p>
      <div className='flex m-2 mt-4'>
        <p className='text-md tracking-wide'>
          {product.dosage} / {product.size}
        </p>
      </div>
      <div className='text-lg tracking-widest text-right my-4'>
        {product.upc && (
          <div className='flex m-2 justify-end gap-1'>
            <p className='text-gray-700 font-black'>UPC</p>
            <p>{product.upc}</p>
          </div>
        )}
        {product.qr_code && (
          <div className='flex m-2 justify-end gap-1'>
            <p className='text-gray-700 font-black'>QR</p>
            <p>{product.qr_code}</p>
          </div>
        )}
        <div className='flex m-2 justify-end gap-1'>
          <p className='text-gray-700 font-black'>SKU</p>
          <p>{product.sku}</p>
        </div>
      </div>
      <div className='text-2xl flex m-2 gap-1'>
        <p>10</p>
        <p className='text-gray-700 font-black'>In Stock</p>
      </div>
      <hr />
      <div className='flex flex-col items-end text-xl text-gray-400 my-6 gap-6'>
        <button onClick={() => {}}>Edit Product Details</button>
        <button
          onClick={() => {
            const packagedForQueue = packageScanResultForQueue(
              product.upc as string,
              product,
              "ean_13",
            );

            addToQueue(packagedForQueue); // !!!ONLY WORKS FOR UPC; EXPECTS UPC TO ALWAYS EXIST!!!
            setToastText("Item added to receiving queue. Click the package icon to finalize the shipment.")
          }}
        >
          Queue Lot
        </button>
        <button onClick={() => {}}>Adjust Quantity</button>
      </div>
      <ul>
        {lots.map((lot, i) => (
          <li key={i} className='text-lg tracking-widest my-4'>
            <hr />
            <div className='flex m-2 gap-1'>
              <p>{lot.lot_number}</p>
              <p className='text-gray-700 font-black'>Lot Number</p>
            </div>
            <div className='flex m-2 gap-1'>
              <p>{lot.expiration_date}</p>
              <p className='text-gray-700 font-black'>Expiration Date</p>
            </div>
            <div className='flex m-2 gap-1'>
              <p>{lot.received_date.split("T")[0]}</p>
              <p className='text-gray-700 font-black'>Received Date</p>
            </div>
            <div className='flex m-2 gap-1'>
              <p>{lot.quantity}</p>
              <p className='text-gray-700 font-black'>Quantity</p>
            </div>
          </li>
        ))}
      </ul>
      <div className='fixed flex flex-col bottom-0 right-0 m-6 gap-3'>
        {!!queue.length && (
          <button className='p-2 bg-zinc-700 rounded-[16px]' onPointerDown={() => {}}>
            <PackageIcon size={40} color='white' weight='light' />
          </button>
        )}
      </div>
    </div>
  ) : null;
}
