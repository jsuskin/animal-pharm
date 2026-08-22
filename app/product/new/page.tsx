"use client";
import { XIcon } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";
import NewProductForm from "../../components/NewProductForm";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const scanResult = searchParams.get("result") || "";

  return (
    <div className='relative bg-black w-full h-screen'>
      <button
        onClick={() => {
          router.push("/");
        }}
        className='absolute right-0 top-0 m-6'
      >
        <XIcon size={32} className='text-slate-400' />
      </button>
      <div className='w-full flex justify-center mt-8'>
        <p className='text-3xl m-8 text-slate-400'>{scanResult}</p>
      </div>
      <NewProductForm key={scanResult} scanResult={scanResult} />
    </div>
  );
}
