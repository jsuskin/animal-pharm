import { ProductWithQuantity } from "@/utils/types";
import { DotsThreeVerticalIcon } from "@phosphor-icons/react";
import { useState } from "react";
import ContextMenu from "./ContextMenu";
import Link from "next/link";

export default function ProductCard({ product }: { product: ProductWithQuantity }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <li className='relative px-2 py-1 border border-y-gray-800 border-x-black'>
      <Link href={`/product/${product.id}`}>
        {menuOpen && (
          <ContextMenu
            productId={product.id!}
            closeMenu={() => {
              setMenuOpen(false);
            }}
          />
        )}
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
          <p className='text-md italic font-extralight'>{product.manufacturer}</p>
          <p className='text-2xl font-medium'>{product.name}</p>
        </div>
        <div className='flex justify-between font-light text-xs py-2'>
          <p>SKU: {product.sku}</p>
          <p>Size: {product.size}</p>
          <p>Dosage: {product.dosage}</p>
          <p>Qty: {product.quantity}</p>
        </div>
      </Link>
    </li>
  );
}
