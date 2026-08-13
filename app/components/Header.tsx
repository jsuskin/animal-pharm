"use client";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className='fixed flex justify-between items-center p-1 w-full bg-black z-10'>
      <div className='w-7' />
      <Link href='/'>
        <Image src='/logo.png' alt='AnimalPharm Logo' width={60} height={60} priority />
      </Link>
      <button onClick={() => {}} className='flex flex-col gap-1 w-7 cursor-pointer'>
        <div className='h-1 bg-white w-full'></div>
        <div className='h-1 bg-white w-2/3'></div>
        <div className='h-1 bg-white w-1/3'></div>
      </button>
    </header>
  );
}
