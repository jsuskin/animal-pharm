import { Product } from "@/utils/types";
import { DotsThreeVerticalIcon } from "@phosphor-icons/react";
import { useState } from "react";
import ContextMenu from "./ContextMenu";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <li className='relative p-3 border border-y-gray-800 border-x-black'>
      <Link href={`/product/${product.id}`}>
        {menuOpen && <ContextMenu />}
        <button
          className='absolute top-3 right-2'
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            
            setMenuOpen(!menuOpen);
          }}
        >
          <DotsThreeVerticalIcon size={28} />
        </button>
        <div>
          <p className='text-xl'>{product.manufacturer}</p>
          <p className='text-3xl text-medium'>{product.name}</p>
        </div>
        <div className='flex justify-between font-light text-sm py-2'>
          <p>SKU: {product.sku}</p>
          <p>Size: {product.size}</p>
          <p>Dosage: {product.dosage}</p>
          <p>Qty: XX</p>
        </div>
      </Link>
    </li>
  );
}
