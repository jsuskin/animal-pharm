"use server";

import { AuthSessionMissingError } from "@supabase/supabase-js";
import { createClient } from "./server";
import { redirect } from "next/navigation";

export async function signUpNewUser(email: string, password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    // options: {
    //   emailRedirectTo: "https://example.com/welcome",
    // },
  });

  return { data, error };
}

export async function signInWithEmail(email: string, password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if(error) return { data, error };

  redirect('/');
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  return { error };
}

export async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error instanceof AuthSessionMissingError) {
    return { user: null, error: null };
  }
  
  return { user, error };
}
