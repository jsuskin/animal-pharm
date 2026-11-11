import { LotTabActionButton } from "../LotTabs/LotTabActionButton";

export default function ScannedItemFieldsInfo() {
  return (
    <div className='relative text-justify m-4 overflow-scroll h-100'>
      <h2 className='text-2xl font-bold text-center m-2'>Scanned Item Fields</h2>
      <ul className='flex top-14 left-5 m-4 gap-0.5'>
        <LotTabActionButton icon='minus' />
        <li
          className={`flex justify-center items-center border BORDERCOLORHERE border-b-transparent TEXTCOLORHERE rounded-t-md p-2 w-14 h-7`}
        >
          <div>
            <span className='text-xs'>1</span>
          </div>
        </li>
        <li
          className={`flex justify-center items-center border BORDERCOLORHERE border-b-transparent TEXTCOLORHERE rounded-t-md p-2 w-14 h-7`}
        >
          <div>
            <span className='text-xs'>2</span>
          </div>
        </li>
        <li
          className={`flex justify-center items-center border BORDERCOLORHERE border-b-transparent TEXTCOLORHERE rounded-t-md p-2 w-14 h-7`}
        >
          <div>
            <span className='text-xs'>3</span>
          </div>
        </li>
        <LotTabActionButton icon='plus' />
      </ul>
      <p className='text-sm'>
        Each scanned item can have multiple lots. Use the tabs to switch between lots and view or
        edit their respective information. Press + to add a new lot. Press − to remove the most
        recently added lot. The − tab disappears when only one lot remains.
      </p>
      <br />
      <p className='text-sm'>
        The text input fields display the information associated with the active scanned item/lot.
        You can edit the scanned code, quantity, lot number, source, and expiration date.
      </p>
      <br />
      <p className='text-sm'>
        The active item is selected in the scanned item queue (
        <span className='text-[#FF00FF]'>❺</span>). Newly scanned items automatically become active.
        You can also select any item in the queue to make it active and view or edit its information
        here.
      </p>
    </div>
  );
}
