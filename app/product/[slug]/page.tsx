"use client";
import { useStore } from "@/app/store/useStore";
import { notFound, usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();
  const products = useStore((state) => state.inventory);
  const product = products.find((product) => String(product.id) === slug);

  if (!product) notFound();

  return (
    <div className='p-4'>
      <p className='text-3xl italic m-2'>{product.manufacturer}</p>
      <p className='text-6xl m-2 font-extrabold'>{product.name}</p>
      <div className='flex m-2 mt-4'>
        <p className='text-md tracking-wide'>
          {product.dosage} / {product.size}
        </p>
      </div>
      <div className='text-xl tracking-widest text-right my-4'>
        {product.upc && (
          <div className='flex m-2 justify-end gap-1'>
            <p className='text-gray-900 font-black'>UPC</p>
            <p>{product.upc}</p>
          </div>
        )}
        {product.qr_code && (
          <div className='flex m-2 justify-end gap-1'>
            <p className='text-gray-900 font-black'>QR</p>
            <p>{product.qr_code}</p>
          </div>
        )}
        <div className='flex m-2 justify-end gap-1'>
          <p className='text-gray-900 font-black'>SKU</p>
          <p>{product.sku}</p>
        </div>
      </div>
      <hr />
      <div className='flex flex-col items-end text-4xl text-gray-400 my-6 gap-6'>
        <button>Edit Product Details</button>
        <button>Adjust Quantity</button>
      </div>
    </div>
  );
}
