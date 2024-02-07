import { createClient } from "@supabase/supabase-js";
const client = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

function getAllPlayers() {
  return client.from("role").select("*").order("order", { ascending: true });
}

export { getAllPlayers };
