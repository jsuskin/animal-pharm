"use client";
import { useEffect, useState } from "react";
import { useStore } from "@/app/store/useStore";
import { notFound, usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type Lot = {
  expiration_date: string;
  id: number;
  lot_number: string;
  quantity: number;
  received_date: string;
  source: string;
};

export default function Page() {
  const [lots, setLots] = useState<Lot[]>([]);
  const pathname = usePathname();
  const slug = pathname.split("/").pop();
  const products = useStore((state) => state.inventory);
  const product = products.find((product) => String(product.id) === slug);
  const router = useRouter();

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

      console.log("Lots:", lots);

      setLots(lots as Lot[]);
    })();
  }, [product.id, supabase]);

  return (
    <div className='p-4'>
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
        <button>Edit Product Details</button>
        <button
          onClick={() => {
            // router.push(`/product/${slug}/lot/new`);
          }}
        >
          Receive Lot
        </button>
        <button>Adjust Quantity</button>
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
    </div>
  );
}
