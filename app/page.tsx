import HomeClient from "./components/HomeClient";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select("*");

  return (
    <div className='relative'>
      <main>
        <HomeClient products={products} />
      </main>
    </div>
  );
}
