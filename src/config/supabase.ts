import { createClient } from '@supabase/supabase-js';

let client: ReturnType<typeof createClient> | undefined;

export const getSupabaseClient = () => {
  if (client) {
    return client;
  }

  const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = import.meta.env;
  if (!VITE_SUPABASE_URL || !VITE_SUPABASE_ANON_KEY) {
    throw new Error(
      'Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en la configuración.',
    );
  }

  client = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);
  return client;
};
