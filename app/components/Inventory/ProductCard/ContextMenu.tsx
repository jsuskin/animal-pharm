import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import { deleteProduct } from "@/actions/inventory";
import { useStore } from "@/app/store/useStore";

export default function ContextMenu({
  productId,
  closeMenu,
}: {
  productId: string;
  closeMenu: () => void;
}) {
  const deleteProductFromInventory = useStore(state => state.deleteProduct);

  return (
    <div className='absolute flex flex-col p-2 px-4 top-7 right-8 bg-blue-200 rounded-sm z-99 gap-2'>
      <button onClick={() => {}} className='flex items-center gap-1'>
        <PencilSimpleIcon size={28} color='black' />
        <span className='text-2xl text-black'>EDIT</span>
      </button>
      <button
        onClick={async (e) => {
          e.stopPropagation();
          e.preventDefault();

          const result = await deleteProduct(productId);

          closeMenu();

          if (!result.success) {
            console.error(result.error);
            return;
          }

          deleteProductFromInventory(productId);
        }}
        className='flex items-center gap-1'
      >
        <TrashIcon size={28} color='black' />
        <span className='text-2xl text-black'>DELETE</span>
      </button>
    </div>
  );
}
