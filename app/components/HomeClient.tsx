"use client";
import type { ProductWithQuantity } from "@/utils/types";
import { PackageIcon, ScanIcon, XIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import Inventory from "./Inventory";
import InventoryActionButton from "./InventoryActionButton";
import { sortProducts } from "@/utils/helperMethods";

export default function HomeClient({ products }: { products: ProductWithQuantity[] | null }) {
  const [startTransaction, setStartTransaction] = useState(false);
  const setProducts = useStore((state) => state.setProducts);
  const sortBy = useStore((state) => state.sort.by);
  const sortDirection = useStore((state) => state.sort.direction);
  const queue = useStore((state) => state.scanner.queue); // !!!NEED TO DECOUPLE QUEUE FROM SCANNER!!!
  
  useEffect(() => {
    if (!products) return;

    const sorted = sortProducts(products, sortDirection, sortBy);

    setProducts(sorted);
  }, [products, setProducts, sortBy, sortDirection]);

  return (
    <>
      <Inventory />
      <div className='fixed flex flex-col bottom-0 right-0 m-6 gap-3'>
        <div className='absolute flex flex-col -top-52 -left-36 gap-3'>
          <InventoryActionButton mode='RECEIVE' active={startTransaction} delay={60} />
          <InventoryActionButton mode='DISPENSE' active={startTransaction} delay={40} />
          <InventoryActionButton mode='ADJUST' active={startTransaction} delay={20} />
          <InventoryActionButton mode='WASTE' active={startTransaction} delay={0} />
        </div>

        {!!queue.length && (
          <button className='p-2 bg-zinc-700 rounded-[16px]' onPointerDown={() => {}}>
            <PackageIcon size={40} color='white' weight='light' />
          </button>
        )}
        <button
          className={`p-2 bg-zinc-700 ${startTransaction ? "rounded-[50px]" : "rounded-[16px]"} transition-[border-radius] duration-600`}
          onPointerDown={() => {
            setStartTransaction(!startTransaction);
          }}
        >
          {startTransaction ? (
            <XIcon size={40} color='white' weight='bold' />
          ) : (
            <ScanIcon size={40} color='white' weight='light' />
          )}
        </button>
      </div>
    </>
  );
}
