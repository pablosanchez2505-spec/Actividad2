import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | undefined;

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

export const testSupabaseConnection = async () => {
  try {
    const supabase = getSupabaseClient();
    const { count, error } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true });

    if (error) {
      throw error;
    }

    console.log('Conexión correcta con Supabase', {
      url: import.meta.env.VITE_SUPABASE_URL,
      tabla: 'clients',
      registros: count,
    });
  } catch (error) {
    console.error('Error de conexión con Supabase', error);
  }
};
