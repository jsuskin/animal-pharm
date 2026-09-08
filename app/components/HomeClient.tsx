"use client";
import type { ProductWithQuantity } from "@/utils/types";
import { ScanIcon, XIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import Inventory from "./Inventory";
import InventoryActionButton from "./InventoryActionButton";

export default function HomeClient({ products }: { products: ProductWithQuantity[] | null }) {
  const [startTransaction, setStartTransaction] = useState(false);
  const setProducts = useStore((state) => state.setProducts);

  useEffect(() => {
    if (!products) return;

    setProducts(products);
  }, [products, setProducts]);

  return (
    <>
      <Inventory />
      <div className='fixed flex flex-col bottom-0 right-0 m-6 gap-3'>
        <div className='absolute flex flex-col -top-52 -left-36 gap-3'>
          <InventoryActionButton mode='RECEIVE' active={startTransaction} delay={80} />
          <InventoryActionButton mode='DISPENSE' active={startTransaction} delay={40} />
          <InventoryActionButton mode='ADJUST' active={startTransaction} delay={20} />
          <InventoryActionButton mode='WASTE' active={startTransaction} delay={0} />
        </div>

        <button
          className={`p-2 bg-blue-200 ${startTransaction ? "rounded-[50px]" : "rounded-[16px]"} transition-[border-radius] duration-600`}
          onPointerDown={() => {
            setStartTransaction(!startTransaction);
          }}
        >
          {startTransaction ? (
            <XIcon size={40} color='black' weight='bold' />
          ) : (
            <ScanIcon size={40} color='black' weight='light' />
          )}
        </button>
      </div>
    </>
  );
}
