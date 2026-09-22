import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function LotDropdown({ productId }: { productId: string | undefined }) {
  const [lotNumbers, setLotNumbers] = useState([]);

  const supabase = createClient();

  useEffect(() => {
    (async () => {
      const { data: lots } = await supabase
        .from("lots_with_quantity")
        .select("*")
        .eq("product_id", productId)
        .neq("source", "adjustment") // Exclude the ghost lot
        .gt("quantity", 0) // Don't offer empty lots
        .order("expiration_date", { ascending: true, nullsFirst: false });

      console.log("Lots:", lots);
    })();
  }, []);

  return (
    <label htmlFor='fruits' className='flex flex-col my-3 mx-5 gap-1'>
      <span className='text-slate-400 w-full'>Choose a lot:</span>
      <select
        id='fruits'
        value='apple'
        onChange={() => {}}
        className='border border-gray-400 w-full py-1 px-2 text-slate-400 bg-slate-700 rounded-sm'
      >
        <option value='' disabled>
          -- Select an Option --
        </option>
        <option value='apple'>Apple</option>
        <option value='banana'>Banana</option>
        <option value='orange'>Orange</option>
      </select>
    </label>
  );
}
