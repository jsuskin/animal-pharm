import ProductPageContent from "../ProductPageContent";
import { createClient } from "@/utils/supabase/server";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", slug)
    .single();

  if (error || !product) {
    return <div>Product not found.</div>;
  }

  return <ProductPageContent product={product} />;
}
