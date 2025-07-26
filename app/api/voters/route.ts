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

    console.log('Fetching voters with params:', { page, limit, search, precinct, split, targetVoter });

    let query = supabase
      .from('Wentzville Voters')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.or(`Voter ID.ilike.%${search}%,First Name.ilike.%${search}%,Last Name.ilike.%${search}%,Full Address.ilike.%${search}%,Political Party.ilike.%${search}%`);
    }

    if (precinct) {
      query = query.eq('Precinct', parseInt(precinct));
    }

    if (split) {
      query = query.eq('Split', parseInt(split));
    }

    if (targetVoter === 'target') {
      query = query.eq('is_target_voter', true);
    } else if (targetVoter === 'non-target') {
      query = query.eq('is_target_voter', false);
    }

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

    console.log(`Successfully fetched ${data?.length || 0} voters (page ${page}, total count: ${count})`);

    return NextResponse.json({
      success: true,
      data: data || [],
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
// Fix for database query error
