import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";

export default function ContextMenu() {
  return (
    <div className='absolute flex flex-col p-2 px-4 top-7 right-8 bg-blue-200 rounded-sm z-99 gap-2'>
      <button className='flex items-center gap-1'>
        <PencilSimpleIcon size={28} color='black' />
        <p className='text-2xl text-black'>EDIT</p>
      </button>
      <button className='flex items-center gap-1'>
        <TrashIcon size={28} color='black' />
        <p className='text-2xl text-black'>DELETE</p>
      </button>
    </div>
  );
}
