"use client";
import type { Product } from "@/utils/types";
import { ScanIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import Inventory from "./Inventory";
import InventoryActionButton from "./InventoryActionButton";
import Scanner from "./Scanner";

export default function HomeClient({ products }: { products: Product[] | null }) {
  const [startTransaction, setStartTransaction] = useState(false);
  const setProducts = useStore((state) => state.setProducts);
  const scannerActive = useStore((state) => state.scanner.active);

  useEffect(() => {
    if (!products) return;
    setProducts(products);
  }, [products, setProducts]);

  return (
    <>
      {scannerActive ? (
        <Scanner />
      ) : (
        <>
          <Inventory />
          <div className='fixed flex flex-col bottom-0 right-0 m-6 gap-3'>
            {startTransaction && (
              <div className='absolute flex flex-col -top-30 -left-50 gap-3'>
                <InventoryActionButton mode='RECEIVE' />
                <InventoryActionButton mode='DISPENSE' />
              </div>
            )}
            <button
              className='p-2 bg-blue-200 rounded-xl'
              onClick={() => {
                setStartTransaction(!startTransaction);
              }}
            >
              <ScanIcon size={48} color='black' weight='light' />
            </button>
          </div>
        </>
      )}
    </>
  );
}
