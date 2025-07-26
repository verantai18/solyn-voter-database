import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '100');
    const search = searchParams.get('search') || '';
    const precinct = searchParams.get('precinct') || '';
    const split = searchParams.get('split') || '';
    const targetVoter = searchParams.get('targetVoter') || '';
    const party = searchParams.get('party') || '';

    console.log('Fetching voters with params:', { page, limit, search, precinct, split, targetVoter, party });

    let query = supabase
      .from('Wentzville Voters')
      .select('*', { count: 'exact' });

    // Apply filters
    if (search) {
      // Check if search is a number (for Voter ID)
      const searchAsNumber = parseInt(search);
      if (!isNaN(searchAsNumber)) {
        // If search is a number, search by Voter ID
        query = query.eq('"Voter ID"', searchAsNumber);
      } else {
        // If search is text, search by name, address, and party
        // Split search terms to handle first/last name combinations
        const searchTerms = search.split(' ').filter(term => term.length > 0);
        
        if (searchTerms.length > 1) {
          // Multiple search terms - search for combinations
          const conditions = [];
          
          // Add individual term searches
          searchTerms.forEach(term => {
            conditions.push(`"First Name".ilike.%${term}%`);
            conditions.push(`"Last Name".ilike.%${term}%`);
          });
          
          // Add full name combinations
          conditions.push(`"First Name".ilike.%${searchTerms[0]}%,"Last Name".ilike.%${searchTerms[1]}%`);
          if (searchTerms.length > 2) {
            conditions.push(`"First Name".ilike.%${searchTerms[0]}%,"Last Name".ilike.%${searchTerms[2]}%`);
          }
          
          // Add address and party searches
          conditions.push(`"Full Address".ilike.%${search}%`);
          conditions.push(`"Political Party".ilike.%${search}%`);
          
          query = query.or(conditions.join(','));
        } else {
          // Single search term
          query = query.or(`"First Name".ilike.%${search}%,"Last Name".ilike.%${search}%,"Full Address".ilike.%${search}%,"Political Party".ilike.%${search}%`);
        }
      }
    }

    if (precinct && precinct !== 'all') {
      query = query.eq('Precinct', parseInt(precinct));
    }

    if (split && split !== 'all') {
      query = query.eq('Split', parseInt(split));
    }

    if (targetVoter === 'target') {
      query = query.eq('is_target_voter', true);
    } else if (targetVoter === 'non-target') {
      query = query.eq('is_target_voter', false);
    }

    // Only apply party filter if it's a valid party that exists in the data
    if (party && party !== 'all') {
      if (party === 'Unaffiliated') {
        // For Unaffiliated, include empty spaces and null values
        query = query.or('"Political Party".is.null,"Political Party".eq.,"Political Party".eq.Unaffiliated');
      } else if (party === 'Republican') {
        query = query.eq('"Political Party"', 'Republican');
      } else {
        // For other parties, only filter if they actually exist
        query = query.eq('"Political Party"', party);
      }
    }

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    query = query
      .order('"Voter ID"', { ascending: true })
      .range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: 500 });
    }

    // Clean up party data - replace empty spaces with "Unaffiliated"
    const cleanedData = data?.map(voter => ({
      ...voter,
      "Political Party": voter["Political Party"]?.trim() === "" || !voter["Political Party"] ? "Unaffiliated" : voter["Political Party"]
    })) || [];

    console.log(`Successfully fetched ${cleanedData.length} voters (page ${page}, total count: ${count})`);

    return NextResponse.json({
      success: true,
      data: cleanedData,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    });

  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({
      success: false,
      error: 'Unexpected error occurred'
    }, { status: 500 });
  }
}
