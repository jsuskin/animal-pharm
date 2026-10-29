import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";
import SortDirectionListItem from "./SortDirectionListItem";
import SortByListItem from "./SortByListItem";

export default function SortOptions({ closeMenu }: { closeMenu: () => void }) {
  return (
    <>
      <div className='absolute flex flex-col p-2 px-4 top-3 left-3 bg-zinc-900 w-50 text-lg text-white text-center font-bold rounded-sm z-99 gap-2'>
        <h2>Sort</h2>
        <hr />
        <div className='flex justify-evenly w-full'>
          <SortDirectionListItem
            Icon={CaretUpIcon}
            sortDirection='ascending'
            closeMenu={closeMenu}
          />
          <SortDirectionListItem
            Icon={CaretDownIcon}
            sortDirection='descending'
            closeMenu={closeMenu}
          />
        </div>
        <hr />
        <ul>
          <SortByListItem sortBy='name' closeMenu={closeMenu} />
          <SortByListItem sortBy='updated_at' closeMenu={closeMenu} />
          <SortByListItem sortBy='quantity' closeMenu={closeMenu} />
        </ul>
        <hr />
        <h2>Filter</h2>
      </div>
      <div
        className='absolute w-screen h-screen bg-transparent -top-5 left-0 z-98 overflow-hidden'
        onClick={closeMenu}
      />
    </>
  );
}
