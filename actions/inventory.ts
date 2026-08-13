"use server";
import { createClient } from "@/utils/supabase/server";
import type { Product } from "@/utils/types";

export async function insertProduct(newProduct: Product) {
  const supabase = await createClient();

  const { data, error } = await supabase.from("products").insert(newProduct).select().single();

  if (error) {
    console.error(error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
