import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";

export default function SortOptions() {
  return (
    <div className='absolute flex flex-col p-2 px-4 top-3 left-3 bg-blue-200 w-60 text-lg text-black text-center font-bold rounded-sm z-99 gap-2'>
      <p>Sort By Product Name</p>
      <div className='flex justify-evenly'>
        <button onClick={() => {}} className='flex items-center gap-1'>
          <CaretUpIcon size={28} weight='bold' />
        </button>
        <button onClick={() => {}} className='flex items-center gap-1'>
          <CaretDownIcon size={28} weight='bold' />
        </button>
      </div>
    </div>
  );
}
