import { ClipboardIcon, InfoIcon, XIcon } from '@phosphor-icons/react'
import React from 'react'

export default function ScreenActionsInfo() {
  return (
    <div className='relative text-justify m-4'>
      <h2 className='text-2xl font-bold text-center m-2'>Screen Actions</h2>
      <div className='flex items-center gap-2 my-4'>
        <span className='m-4'>
          <XIcon size={40} className='text-slate-400' />
        </span>
        <p className='text-sm'>
          Closes the scanner and clears the scanned item queue (
          <span className='text-[#FF00FF]'>❺</span>). The queue can be restored using the{" "}
          <ClipboardIcon
            size={18}
            weight='bold'
            className='inline-block align-[-0.15em] mx-0.5'
            aria-hidden='true'
          />{" "}
          icon in section <span className='text-[#FF6600]'>❹</span>.
        </p>
      </div>
      <div className='flex items-center gap-2 my-4'>
        <span className='m-4'>
          <InfoIcon size={40} className='text-slate-400' />
        </span>
        <p className='text-sm'>
          Opens this information screen. Select a colored segment on the cellphone diagram to learn
          about that section of the scanner screen. Click anywhere outside the minimized diagram to
          maximize it.
        </p>
      </div>
    </div>
  );
}
