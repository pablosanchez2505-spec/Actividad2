import { getSupabaseClient } from '../config/supabase';
import type { Client, ClientInput } from '../interfaces/Client';

export const getClients = async (): Promise<Client[]> => {
  const { data, error } = await getSupabaseClient()
    .from('clients')
    .select('id, name, email, phone')
    .order('name');

  if (error) {
    throw error;
  }

  return data;
};

export const getClient = async (id: string): Promise<Client> => {
  const { data, error } = await getSupabaseClient()
    .from('clients')
    .select('id, name, email, phone')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const createClient = async (client: ClientInput): Promise<Client> => {
  const { data, error } = await getSupabaseClient()
    .from('clients')
    .insert(client)
    .select('id, name, email, phone')
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateClient = async (
  id: string,
  client: ClientInput,
): Promise<Client> => {
  const { data, error } = await getSupabaseClient()
    .from('clients')
    .update(client)
    .eq('id', id)
    .select('id, name, email, phone')
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteClient = async (id: string): Promise<void> => {
  const { error } = await getSupabaseClient().from('clients').delete().eq('id', id);

  if (error) {
    throw error;
  }
};
