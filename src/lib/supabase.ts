import { createClient } from '@supabase/supabase-js';

let supabaseUrl = 'https://placeholder.supabase.co';
let supabaseAnonKey = 'placeholder';

// Try standard Node.js process.env first (safe for Vercel Serverless)
try {
  if (typeof process !== 'undefined' && process.env) {
    supabaseUrl = process.env.PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || supabaseUrl;
    supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || supabaseAnonKey;
  }
} catch (e) {}

// Try Vite's import.meta.env (safe for local development, wrapped in try-catch to prevent Vercel crashes)
try {
  supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL || supabaseUrl;
  supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || supabaseAnonKey;
} catch (e) {
  // If import.meta.env is undefined in Node, this safely ignores the TypeError
}

if (supabaseUrl === 'https://placeholder.supabase.co' || supabaseAnonKey === 'placeholder') {
  console.warn("Supabase credentials not found in environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
