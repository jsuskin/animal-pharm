"use client";
import { useEffect, useState } from "react";
import Inventory from "./Inventory";
import Scanner from "./Scanner";
import { ScanIcon } from "@phosphor-icons/react";
import { useStore } from "../store/useStore";
import type { Product } from "@/utils/types";
import { useRouter } from "next/navigation";

export default function HomeClient({ products }: { products: Product[] | null }) {
  const [scanResult, setScanResult] = useState("");
  const [scanFormat, setScanFormat] = useState<"ean_13" | "qr_code">("ean_13");
  const [scannerActive, setScannerActive] = useState(false);
  const setProducts = useStore((state) => state.setProducts);

  const router = useRouter();

  useEffect(() => {
    if (!products) return;
    setProducts(products);
  }, [products, setProducts]);

  useEffect(() => {
    if (scanResult && scanResult.length > 0) {
      const product = products?.find(
        (product) => product[scanFormat === "ean_13" ? "upc" : "qr_code"] === scanResult,
      );

      if (product) {
        router.push(`/product/${product.id}`);
      } else {
        const params = new URLSearchParams();
        params.set("result", scanResult);
        params.set("format", scanFormat);

        router.push(`/product/new?${params.toString()}`);
      }
    }
  }, [scanResult, scanFormat, router, products]);

  return (
    <>
      {scannerActive ? (
        <Scanner
          scannerActive={scannerActive}
          setScannerActive={setScannerActive}
          setScanResult={setScanResult}
          scanFormat={scanFormat}
          setScanFormat={setScanFormat}
        />
      ) : (
        <>
          <Inventory />
          <button
            className='fixed bottom-0 right-0 m-6 p-2 bg-blue-200 rounded-xl'
            onClick={() => {
              setScannerActive(true);
            }}
          >
            <ScanIcon size={48} color='black' weight='light' />
          </button>
        </>
      )}
    </>
  );
}
