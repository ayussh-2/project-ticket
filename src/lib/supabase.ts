import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Hacker = Database['public']['Tables']['hackers']['Row'];
export type Team = Database['public']['Tables']['teams']['Row'];
export type CalendarEvent = Database['public']['Tables']['calendar_events']['Row'];