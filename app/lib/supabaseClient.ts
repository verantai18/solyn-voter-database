import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xximnqpzbiicytrmkfqa.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4aW1ucXB6YmlpY3l0cm1rZnFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MzkxNDMsImV4cCI6MjA2ODUxNTE0M30.So0RuqFBBkUh1FuYyzcQX3HqmMtOWNIxwklCSnEra34';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 