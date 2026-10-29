"use client";
import { XIcon } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";
import NewProductForm from "../../components/NewProductForm";
import { useStore } from "@/app/store/useStore";

export default function Page() {
  const searchParams = useSearchParams();
  const scanResult = searchParams.get("result") || "";
  const scanMode = useStore((state) => state.scanner.mode);
  const router = useRouter();

  return (
    <div className='relative bg-black w-full h-screen'>
      <button
        onClick={() => {
          router.push(scanMode ? "/scan?action=" + scanMode : "/");
        }}
        className='absolute right-0 top-0 m-6'
      >
        <XIcon size={32} className='text-slate-400' />
      </button>
      <div className='w-full flex flex-col justify-center text-center mt-8 mb-4'>
        <h2 className='text-lg mt-8 text-slate-400/80'>
          Please fill out the product information for{" "}
        </h2>
        <h2 className='text-2xl text-green-300'>{scanResult}</h2>
      </div>
      <NewProductForm key={scanResult} scanResult={scanResult} />
    </div>
  );
}
