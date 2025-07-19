'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Voter {
  id: string;
  birth_year?: number;
  gender?: string;
  voter_precinct?: string;
  ward?: string;
  congressional_district?: string;
  legislative_district?: string;
  senate_district?: string;
  registration_date?: string;
  township?: string;
  assigned_highschool?: string;
  assigned_middleschool?: string;
  assigned_elementaryschool?: string;
  neighborhood?: string;
  is_active?: boolean;
  vote_history_1?: boolean;
  vote_history_2?: boolean;
  vote_history_3?: boolean;
  vote_history_4?: boolean;
}

export default function VotersPage() {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVoters();
  }, []);

  async function fetchVoters() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('voters')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        setError(error.message);
      } else {
        setVoters(data || []);
      }
    } catch (err) {
      setError('Failed to fetch voters');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Voter Database</h1>
        <p>Loading voters...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Voter Database</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Voter Database</h1>
      
      <div className="mb-6">
        <p className="text-gray-600">
          Total voters: {voters.length}
        </p>
      </div>

      {voters.length === 0 ? (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
          No voters found. Add some voter data to get started!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Birth Year</th>
                <th className="border px-4 py-2">Gender</th>
                <th className="border px-4 py-2">Precinct</th>
                <th className="border px-4 py-2">Ward</th>
                <th className="border px-4 py-2">Active</th>
                <th className="border px-4 py-2">Vote History</th>
              </tr>
            </thead>
            <tbody>
              {voters.map((voter) => (
                <tr key={voter.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 text-sm">{voter.id.slice(0, 8)}...</td>
                  <td className="border px-4 py-2">{voter.birth_year || '-'}</td>
                  <td className="border px-4 py-2">{voter.gender || '-'}</td>
                  <td className="border px-4 py-2">{voter.voter_precinct || '-'}</td>
                  <td className="border px-4 py-2">{voter.ward || '-'}</td>
                  <td className="border px-4 py-2">
                    {voter.is_active ? '✅ Active' : '❌ Inactive'}
                  </td>
                  <td className="border px-4 py-2 text-sm">
                    {[
                      voter.vote_history_1 ? '1' : '0',
                      voter.vote_history_2 ? '1' : '0',
                      voter.vote_history_3 ? '1' : '0',
                      voter.vote_history_4 ? '1' : '0'
                    ].join('-')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 