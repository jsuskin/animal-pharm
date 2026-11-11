import { CheckIcon, FlashlightIcon } from '@phosphor-icons/react';
import React from 'react'

export default function ScannerControlsInfo() {
  return (
    <div className='relative text-justify m-4'>
      <h2 className='text-2xl font-bold text-center m-2'>Screen Controls</h2>
      <div className='flex items-center gap-2 my-4'>
        <span className='m-4'>
          <CheckIcon size={40} className='text-slate-400' />
        </span>
        <p className='text-sm'>
          Complete the scanning session.
        </p>
      </div>
      <div className='flex items-center gap-2 my-4'>
        <span className='m-4'>
          <FlashlightIcon size={40} className='text-slate-400' />
        </span>
        <p className='text-sm'>
          Toggle the torch.
        </p>
      </div>
    </div>
  );
}
