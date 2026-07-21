"use client";
import React, { useEffect, useState } from "react";
import InventoryTable from "./InventoryTable";
import Scanner from "./Scanner";
import NewProductForm from "./NewProductForm";
import { BarcodeIcon } from "@phosphor-icons/react";
import { useStore } from "../store/useStore";

export default function HomeClient({
  products,
}: {
  products: { [key: string]: string }[] | null;
}) {
  // const [showNewProductForm, setShowNewProductForm] = useState(true);
  const [result, setResult] = useState("");
  const [scannerActive, setScannerActive] = useState(false);
  const setProducts = useStore((state) => state.setProducts);

  useEffect(() => {
    if (!products) return;
    setProducts(products);
  }, [products, setProducts]);

  return (
    <>
      {scannerActive ? (
        <Scanner
          scannerActive={scannerActive}
          setScannerActive={setScannerActive}
          setResult={setResult}
        />
      ) : (
        <>
          {!!result.length && <NewProductForm result={result} setResult={setResult} />}
          <InventoryTable />

          <button
            className='fixed bottom-0 right-0 m-6 p-2 bg-blue-200 rounded-xl'
            onClick={() => {
              setScannerActive(true);
            }}
          >
            <BarcodeIcon size={64} color='black' weight='light' />
          </button>
        </>
      )}
    </>
  );
}
