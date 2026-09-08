import { useCloseMenu } from "@/hooks/useCloseMenu";
import { signOut } from "@/utils/supabase/auth";
import { SignInIcon, SignOutIcon } from "@phosphor-icons/react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRef, useEffect } from "react";

export default function UserMenu({
  user,
  menuOpen,
  setMenuOpen,
}: {
  user: User | null;
  menuOpen: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useCloseMenu(menuRef, menuOpen, setMenuOpen);

  return (
    <div className='absolute top-0 left-0 w-screen h-screen bg-transparent'>
      <div
        ref={menuRef}
        className='absolute flex flex-col p-2 px-4 top-8 right-7 bg-blue-200 text-lg text-black text-center font-bold rounded-sm z-99 gap-2'
      >
        {user ? (
          <button
            onClick={() => {
              signOut();
              setMenuOpen(false);
            }}
            className='flex items-center gap-1'
          >
            <span>SIGN OUT</span>
            <SignOutIcon size={24} weight='bold' />
          </button>
        ) : (
          <Link
            href='/auth/sign-in'
            onClick={() => setMenuOpen(false)}
            className='flex items-center gap-1'
          >
            <span>SIGN IN</span>
            <SignInIcon size={24} weight='bold' />
          </Link>
        )}
      </div>
    </div>
  );
}
