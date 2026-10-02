import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * The shared CloudTech Supabase project (the same one as CloudTech Academy). Both values are public by
 * design; row-level security and submit_collection_request() protect the data.
 */
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dwrulmgzgkfzrtayomvy.supabase.co";
const KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3cnVsbWd6Z2tmenJ0YXlvbXZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NjA2NzcsImV4cCI6MjEwNjMzNjY3N30.1sQWy0hJqQl-qzAewhtjKvJjvtJeTPhuhV6qJDLtS1g";

let client: SupabaseClient | null = null;

export function supabase() {
  client ??= createClient(URL, KEY, { auth: { storageKey: "ct-collection-auth" } });
  return client;
}

export type RequestKind = "item" | "corporate" | "kit" | "general";

export type RequestItem = { product: string; slug?: string; quantity: number; size?: string; variant?: string };

export type RequestPayload = {
  kind: RequestKind;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  items?: RequestItem[];
  products?: string[];
  quantity?: number | null;
  event_date?: string;
  location?: string;
  message?: string;
};

/** Sends a request. Returns its reference (CTC-XXXXXX) or throws with a message to show. */
export async function submitRequest(p: RequestPayload): Promise<string> {
  const { data, error } = await supabase().rpc("submit_collection_request", { p });
  if (error) throw new Error(error.message || "We couldn't send your request. Please try again.");
  return data as string;
}
