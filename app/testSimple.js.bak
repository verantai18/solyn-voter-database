const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://xximnqpzbiicytrmkfqa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4aW1ucXB6YmlpY3l0cm1rZnFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MzkxNDMsImV4cCI6MjA2ODUxNTE0M30.So0RuqFBBkUh1FuYyzcQX3HqmMtOWNIxwklCSnEra34';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  console.log('Testing Supabase connection...');
  
  try {
    const { data, error } = await supabase
      .from('voters')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('Error:', error.message);
      if (error.message.includes('does not exist')) {
        console.log('✅ Connection successful! The voters table just doesn\'t exist yet.');
      }
    } else {
      console.log('✅ Connection successful!');
      console.log('Data:', data);
    }
  } catch (err) {
    console.log('Unexpected error:', err);
  }
}

test(); 