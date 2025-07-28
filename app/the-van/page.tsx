'use client';

import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface Voter {
  "Voter ID": string;
  "Full Name": string;
  "Full Address": string;
  "Political Party": string;
  "is_target_voter": boolean;
  "Age": number;
  "Gender": string;
  "Precinct": string;
  "Split": string;
  "Ward": string;
  "Township": string;
  "Voter History 1": string;
  "Voter History 2": string;
  "Voter History 3": string;
  "Voter History 4": string;
  "Voter History 5": string;
}

export default function TheVanPage() {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalVoters, setTotalVoters] = useState(0);
  const [precinctFilter, setPrecinctFilter] = useState('all');
  const [splitFilter, setSplitFilter] = useState('all');
  const [targetVoterFilter, setTargetVoterFilter] = useState('all');
  const [partyFilter, setPartyFilter] = useState('all');
  const [precincts, setPrecincts] = useState<string[]>([]);
  const [splits, setSplits] = useState<string[]>([]);
  const [parties, setParties] = useState<string[]>([]);

  const pageSize = 50;

  const fetchVoters = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: pageSize.toString(),
        search: searchTerm,
        precinct: precinctFilter,
        split: splitFilter,
        targetVoter: targetVoterFilter,
        party: partyFilter,
      });

      const response = await fetch(`/api/voters?${params}`);
      const data = await response.json();
      
      setVoters(data.voters);
      setTotalPages(data.totalPages);
      setTotalVoters(data.totalVoters);
    } catch (error) {
      console.error('Error fetching voters:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, precinctFilter, splitFilter, targetVoterFilter, partyFilter]);

  const fetchFilters = useCallback(async () => {
    try {
      const response = await fetch('/api/voters/filters');
      const data = await response.json();
      setPrecincts(data.precincts);
      setSplits(data.splits);
      setParties(data.parties);
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  }, []);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, precinctFilter, splitFilter, targetVoterFilter, partyFilter]);

  useEffect(() => {
    fetchVoters();
  }, [fetchVoters]);

  const handleSearch = () => {
    fetchVoters();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatVotingHistory = (history: string) => {
    if (!history) return 'None';
    return history.split(',').map(vote => vote.trim()).filter(vote => vote).join(' • ');
  };

  const getTargetVoterLabel = (isTarget: boolean) => {
    return isTarget ? 'Target Voter' : 'Non-Target Voter';
  };

  const getTargetVoterColor = (isTarget: boolean) => {
    return isTarget ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Voter Database</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <Input
              placeholder="Search by name, ID, address, or party..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSearch} className="px-6">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={precinctFilter} onValueChange={setPrecinctFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Precinct" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Precincts</SelectItem>
                {precincts.map((precinct) => (
                  <SelectItem key={precinct} value={precinct}>
                    {precinct}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={splitFilter} onValueChange={setSplitFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Split" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Splits</SelectItem>
                {splits.map((split) => (
                  <SelectItem key={split} value={split}>
                    {split}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={targetVoterFilter} onValueChange={setTargetVoterFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Municipal Voter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Voters</SelectItem>
                <SelectItem value="true">Target Voters</SelectItem>
                <SelectItem value="false">Non Municipal Voter</SelectItem>
              </SelectContent>
            </Select>

            <Select value={partyFilter} onValueChange={setPartyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Political Party" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Parties</SelectItem>
                {parties.map((party) => (
                  <SelectItem key={party} value={party}>
                    {party}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Pagination - Moved below filters and above voter data */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalVoters)} of {totalVoters.toLocaleString()} voters
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Voter Data Table */}
          {loading ? (
            <div className="text-center py-8">Loading voters...</div>
          ) : (
            <div className="space-y-2">
              {voters.map((voter, index) => (
                <Card key={`${voter["Voter ID"]}-${index}`} className="p-3">
                  <div className="grid grid-cols-5 gap-3 items-center">
                    {/* Voter Information */}
                    <div className="space-y-1 text-center">
                      <div className="font-semibold text-base leading-tight">{voter["Full Name"]}</div>
                      <div className="text-xs text-gray-600">ID: {voter["Voter ID"]}</div>
                      <div className="text-xs leading-tight">{voter["Full Address"]}</div>
                      <div className="text-xs text-gray-600">{voter["Political Party"] || 'Unaffiliated'}</div>
                    </div>

                    {/* Location Information */}
                    <div className="space-y-0.5 text-xs text-center">
                      <div><span className="font-medium">P:</span> {voter["Precinct"]}</div>
                      <div><span className="font-medium">S:</span> {voter["Split"]}</div>
                      <div><span className="font-medium">W:</span> {voter["Ward"]}</div>
                      <div><span className="font-medium">T:</span> {voter["Township"]}</div>
                    </div>

                    {/* Target Status */}
                    <div className="flex items-center justify-center">
                      <Badge className={`${getTargetVoterColor(voter["is_target_voter"])} text-xs px-2 py-1`}>
                        {getTargetVoterLabel(voter["is_target_voter"])}
                      </Badge>
                    </div>

                    {/* Demographics */}
                    <div className="space-y-0.5 text-xs text-center">
                      <div><span className="font-medium">Age:</span> {voter["Age"]}</div>
                      <div><span className="font-medium">Gender:</span> {voter["Gender"]}</div>
                    </div>

                    {/* Voting History */}
                    <div className="space-y-0.5 text-center">
                      <div className="font-medium text-xs mb-1">Voting History:</div>
                      <div className="text-xs space-y-0.5">
                        <div>1. {formatVotingHistory(voter["Voter History 1"])}</div>
                        <div>2. {formatVotingHistory(voter["Voter History 2"])}</div>
                        <div>3. {formatVotingHistory(voter["Voter History 3"])}</div>
                        <div>4. {formatVotingHistory(voter["Voter History 4"])}</div>
                        <div>5. {formatVotingHistory(voter["Voter History 5"])}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
