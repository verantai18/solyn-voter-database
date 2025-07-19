// testSupabase.ts
import { supabase } from '@/lib/supabaseClient';

async function testConnection() {
  console.log('=== Testing Supabase Connection ===');
  console.log('Starting test...');
  
  try {
    console.log('Attempting to connect to voters table...');
    
    // Test connection to the existing voters table
    const { data, error } = await supabase
      .from('voters')
      .select('*')
      .limit(1);
    
    console.log('Query completed');
    
    if (error) {
      console.log('❌ Error occurred:', error.message);
    } else {
      console.log('✅ Connection successful!');
      console.log('Voters table exists and is accessible');
      console.log('Number of records found:', data?.length || 0);
      if (data && data.length > 0) {
        console.log('Sample record:', data[0]);
      }
    }
  } catch (err) {
    console.log('❌ Unexpected error:', err);
  }
  
  console.log('=== Test Complete ===');
}

console.log('Script starting...');
testConnection(); 