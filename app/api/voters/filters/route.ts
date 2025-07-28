import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  try {
    console.log('Fetching filter data from Supabase...');

    // Fetch unique precincts
    const { data: precinctData, error: precinctError } = await supabase
      .from('Wentzville Voters')
      .select('Precinct')
      .not('Precinct', 'is', null);

    if (precinctError) {
      console.error('Error fetching precincts:', precinctError);
      return NextResponse.json({ error: 'Failed to fetch precincts' }, { status: 500 });
    }

    // Fetch unique splits
    const { data: splitData, error: splitError } = await supabase
      .from('Wentzville Voters')
      .select('Split')
      .not('Split', 'is', null);

    if (splitError) {
      console.error('Error fetching splits:', splitError);
      return NextResponse.json({ error: 'Failed to fetch splits' }, { status: 500 });
    }

    // Fetch unique political parties
    const { data: partyData, error: partyError } = await supabase
      .from('Wentzville Voters')
      .select('"Political Party"')
      .not('"Political Party"', 'is', null);

    if (partyError) {
      console.error('Error fetching parties:', partyError);
      return NextResponse.json({ error: 'Failed to fetch parties' }, { status: 500 });
    }

    // Extract unique values and sort them
    const precincts = [...new Set(precinctData.map(item => item.Precinct))].sort((a, b) => a - b);
    const splits = [...new Set(splitData.map(item => item.Split))].sort((a, b) => a - b);
    
    // Clean up party data and add "Unaffiliated" for empty/null values
    const parties = [...new Set(partyData.map(item => {
      const party = item['Political Party']?.trim();
      return party === '' || !party ? 'Unaffiliated' : party;
    }))].sort();

    console.log(`Successfully fetched filters: ${precincts.length} precincts, ${splits.length} splits, ${parties.length} parties`);

    return NextResponse.json({
      precincts: precincts.map(p => p.toString()),
      splits: splits.map(s => s.toString()),
      parties
    });

  } catch (error) {
    console.error('Unexpected error fetching filters:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} // Force new deployment
