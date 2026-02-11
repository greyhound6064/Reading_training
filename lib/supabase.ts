import { createClient } from '@supabase/supabase-js';
import { Passage } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 지문 목록 조회
export async function getPassages(searchQuery?: string, sortOrder: 'desc' | 'asc' = 'desc') {
  let query = supabase
    .from('reading_passages')
    .select('*')
    .order('created_at', { ascending: sortOrder === 'asc' });

  if (searchQuery) {
    query = query.or(`title.ilike.%${searchQuery}%,tags.cs.{${searchQuery}}`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching passages:', error);
    return [];
  }

  return data as Passage[];
}

// 단일 지문 조회
export async function getPassage(id: string) {
  const { data, error } = await supabase
    .from('reading_passages')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching passage:', error);
    return null;
  }

  return data as Passage;
}

// 지문 생성
export async function createPassage(passage: Omit<Passage, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('reading_passages')
    .insert([passage])
    .select()
    .single();

  if (error) {
    console.error('Error creating passage:', error);
    throw error;
  }

  return data as Passage;
}

// 지문 수정
export async function updatePassage(id: string, passage: Partial<Passage>) {
  const { data, error } = await supabase
    .from('reading_passages')
    .update({ ...passage, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating passage:', error);
    throw error;
  }

  return data as Passage;
}

// 지문 삭제
export async function deletePassage(id: string) {
  const { error } = await supabase
    .from('reading_passages')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting passage:', error);
    throw error;
  }
}
