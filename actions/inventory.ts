"use server";
import { createClient } from "@/utils/supabase/server";
import type { Product, TransactionType } from "@/utils/types";

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

export async function createNewLotTransaction(
  lotNumber: string,
  expirationDate: string,
  productId: number,
  receivedDate: Date | null,
  quantity: number,
  note: string,
) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("create_new_lot_transaction", {
    _lot_number: lotNumber,
    _expiration_date: expirationDate,
    _product_id: productId,
    _received_date: receivedDate,
    _delta: quantity,
    _note: note,
    _type: "RECEIVE",
  });

  if (error) {
    console.error(error);
    return;
  }

  console.log("New Lot Data:", data);

  return data;
}
