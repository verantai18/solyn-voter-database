import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function GET() {
  try {
    console.log('Testing Supabase connection...');
    
    const { data, error } = await supabase
      .from('voters')
      .select('*')
      .limit(5);
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ 
        success: false, 
        error: error.message 
      }, { status: 500 });
    }
    
    console.log('Connection successful!');
    console.log('Records found:', data?.length || 0);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Supabase connection working!',
      recordCount: data?.length || 0,
      sampleData: data?.slice(0, 2) || []
    });
    
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ 
      success: false, 
      error: 'Unexpected error occurred' 
    }, { status: 500 });
  }
} 