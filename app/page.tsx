import HomeClient from "./components/HomeClient";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select("*");

  return (
    <div className='relative'>
      <header className='p-4 px-10'>
        <h1 className='text-4xl'>Animal Pharm</h1>
      </header>
      <main>
        <HomeClient products={products} />
      </main>
    </div>
  );
}
