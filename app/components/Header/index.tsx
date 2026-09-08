"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SortOptions from "./SortOptions";
import { UserCircleIcon, UserIcon } from "@phosphor-icons/react";
import { User } from "@supabase/supabase-js";
import { signOut } from "@/utils/supabase/auth";
import UserMenu from "./UserMenu";

export default function Header({ user }: { user: User | null }) {
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  console.log("User", user);

  return (
    <header className='grid grid-cols-3 items-center p-1 w-full bg-black z-10'>
      <div className='relative justify-self-start'>
        <button
          onClick={() => {
            setSortMenuOpen(!sortMenuOpen);
          }}
          className='flex flex-col gap-1 w-7 cursor-pointer'
        >
          <div className='h-1 bg-white w-full'></div>
          <div className='h-1 bg-white w-2/3'></div>
          <div className='h-1 bg-white w-1/3'></div>
        </button>
        {sortMenuOpen && <SortOptions />}
      </div>
      <div className='justify-self-center'>
        <Link href='/'>
          <Image src='/logo.png' alt='AnimalPharm Logo' width={60} height={60} priority />
        </Link>
      </div>
      <div className='justify-self-end'>
        <button onClick={() => setUserMenuOpen(!userMenuOpen)}>
          <UserCircleIcon size={40} />
        </button>
        {userMenuOpen && <UserMenu user={user} setMenuOpen={setUserMenuOpen} menuOpen={userMenuOpen} />}
        {/* {user ? (
          <button
            onClick={async () => {
              const { error } = await signOut();

              if (error) {
                console.error(error);
                return;
              }

              console.log("Signed out");
            }}
          >
            <UserCircleIcon />
          </button>
        ) : (
          <Link href='/auth/sign-in'>
            <UserCircleIcon />
          </Link>
        )} */}
      </div>
    </header>
  );
}
