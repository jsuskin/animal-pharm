import { PencilIcon, XIcon } from "@phosphor-icons/react";
import React from "react";

export default function ScannedItemQueueInfo() {
  return (
    <div className='relative text-justify m-4 overflow-scroll h-100'>
      <h2 className='text-2xl font-bold text-center m-2'>Scanned Item Queue</h2>
      <p className='text-sm'>
        The items you scan will appear here, in the order that you scan them. Press on a listed item
        to set it as the active item, which will allow you to update that item&apos;s
        transaction/lot information using the lot tabs and text input fields in section{" "}
        <span className='text-[#FF00FF]'>❺</span>.
      </p>
      <br />
      <p className='text-sm'>
        Items that have been scanned previously in other sessions will be displayed in the following
        format:
      </p>
      <div className='w-full text-center'>
        <code className='text-[#a8a432] text-xs'>
          &lt;manufacturer&gt; &lt;name&gt; &lt;dosage&gt; &lt;size&gt;
        </code>
      </div>
      <br />
      <p className='text-sm'>
        Items that are new to your inventory will be displayed with their scanned code.
      </p>
      <br />
      <p className='text-sm'>
        Pressing the{" "}
        <PencilIcon
          size={18}
          weight='bold'
          className='inline-block align-[-0.15em] mx-0.5'
          aria-hidden='true'
        />{" "}
        icon next to a new item will allow you to update that item&apos;s product info without
        ending the scanning session.
      </p>
      <br />
      <p className='text-sm'>
        Pressing the{" "}
        <XIcon
          size={18}
          weight='bold'
          className='inline-block align-[-0.25em] mx-0.1'
          aria-hidden='true'
        />{" "}
        icon next to a queue item will remove that item from the queue.
      </p>
    </div>
  );
}
