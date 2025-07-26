"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabaseClient"

interface Voter {
  "Voter ID": number;
  "First Name"?: string;
  "Last Name"?: string;
  "Full Address"?: string;
  "Political Party"?: string;
  "Precinct"?: number;
  "Split"?: number;
  "Ward"?: string;
  "Township"?: string;
  "Birth Year"?: number;
  "Voter History"?: string;
  "Voter History 1"?: string;
  "Voter History 2"?: string;
  "Voter History 3"?: string;
  "Voter History 4"?: string;
  "Voter History 5"?: string;
  "is_target_voter"?: boolean;
}

export default function TheVanPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [voters, setVoters] = useState<Voter[]>([])
  const [loading, setLoading] = useState(false)
  const [precinctFilter, setPrecinctFilter] = useState("")
  const [splitFilter, setSplitFilter] = useState("")
  const [targetVoterFilter, setTargetVoterFilter] = useState("")

  useEffect(() => {
    fetchVoters()
  }, [])

  async function fetchVoters() {
    try {
      setLoading(true)
      console.log("Fetching ALL voters from Supabase...")
      
      const { data, error } = await supabase
        .from('Wentzville Voters')
        .select('*')
        .order('"Voter ID"', { ascending: true })

      if (error) {
        console.error('Error fetching voters:', error)
        setVoters([])
      } else {
        console.log(`Successfully fetched ${data?.length || 0} voters`)
        setVoters(data || [])
      }
    } catch (err) {
      console.error('Failed to fetch voters:', err)
      setVoters([])
    } finally {
      setLoading(false)
    }
  }

  const filteredVoters = voters.filter((voter) => {
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase()
      const matchesSearch = (
        (voter["Voter ID"] && String(voter["Voter ID"]).toLowerCase().includes(lowerCaseSearchTerm)) ||
        (voter["First Name"] && voter["First Name"].toLowerCase().includes(lowerCaseSearchTerm)) ||
        (voter["Last Name"] && voter["Last Name"].toLowerCase().includes(lowerCaseSearchTerm)) ||
        (voter["Full Address"] && voter["Full Address"].toLowerCase().includes(lowerCaseSearchTerm)) ||
        (voter["Political Party"] && voter["Political Party"].toLowerCase().includes(lowerCaseSearchTerm))
      )
      if (!matchesSearch) return false
    }

    if (precinctFilter && voter["Precinct"] && String(voter["Precinct"]) !== precinctFilter) return false
    if (splitFilter && voter["Split"] && String(voter["Split"]) !== splitFilter) return false
    if (targetVoterFilter === "target" && !voter["is_target_voter"]) return false
    if (targetVoterFilter === "non-target" && voter["is_target_voter"]) return false

    return true
  })

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>CAPES Voter Database</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Loading voter data...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            CAPES Voter Database
          </CardTitle>
          <p className="text-center text-gray-600">
            Search and analyze voter data for the Wentzville School District
          </p>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <Input
                placeholder="Search by name, ID, address, or party..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="lg:col-span-2"
              />
              
              <Input
                placeholder="Filter by Precinct"
                value={precinctFilter}
                onChange={(e) => setPrecinctFilter(e.target.value)}
              />

              <Input
                placeholder="Filter by Split"
                value={splitFilter}
                onChange={(e) => setSplitFilter(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
              <Button 
                variant={targetVoterFilter === "target" ? "default" : "outline"}
                onClick={() => setTargetVoterFilter(targetVoterFilter === "target" ? "" : "target")}
              >
                Target Voters Only
              </Button>
              
              <Button 
                variant={targetVoterFilter === "non-target" ? "default" : "outline"}
                onClick={() => setTargetVoterFilter(targetVoterFilter === "non-target" ? "" : "non-target")}
              >
                Non-Target Voters Only
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setPrecinctFilter("")
                  setSplitFilter("")
                  setTargetVoterFilter("")
                }}
              >
                Clear All Filters
              </Button>
            </div>

            <div className="flex justify-between items-center mb-4">
              <Button onClick={fetchVoters} disabled={loading}>
                {loading ? 'Loading...' : 'Refresh'}
              </Button>
              
              <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                <span>Total Voters: {voters.length.toLocaleString()}</span>
                <span>•</span>
                <span>Filtered: {filteredVoters.length.toLocaleString()}</span>
                {(searchTerm || precinctFilter || splitFilter || targetVoterFilter) && (
                  <>
                    <span>•</span>
                    <span>Filters Active</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Voter ID</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Target Voter</TableHead>
                  <TableHead>Party</TableHead>
                  <TableHead>Birth Year</TableHead>
                  <TableHead>Precinct</TableHead>
                  <TableHead>Split</TableHead>
                  <TableHead>Ward</TableHead>
                  <TableHead>Township</TableHead>
                  <TableHead>Voting History</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVoters.length > 0 ? (
                  filteredVoters.slice(0, 100).map((voter) => (
                    <TableRow key={String(voter["Voter ID"])}>
                      <TableCell className="font-medium">{String(voter["Voter ID"]).slice(0, 8)}...</TableCell>
                      <TableCell>
                        {voter["First Name"]} {voter["Last Name"]}
                      </TableCell>
                      <TableCell className="text-sm max-w-xs truncate">
                        {voter["Full Address"] || '-'}
                      </TableCell>
                      <TableCell>
                        {voter["is_target_voter"] ? '✅ Yes' : '❌ No'}
                      </TableCell>
                      <TableCell className="text-sm">
                        {voter["Political Party"] || '-'}
                      </TableCell>
                      <TableCell>{voter["Birth Year"] || '-'}</TableCell>
                      <TableCell>{voter["Precinct"] || '-'}</TableCell>
                      <TableCell>{voter["Split"] || '-'}</TableCell>
                      <TableCell>{voter["Ward"] || '-'}</TableCell>
                      <TableCell>{voter["Township"] || '-'}</TableCell>
                      <TableCell className="text-xs max-w-xs">
                        {[voter["Voter History"], voter["Voter History 1"], voter["Voter History 2"], voter["Voter History 3"], voter["Voter History 4"]].filter(Boolean).length > 0 ? (
                          <div className="space-y-1">
                            {[voter["Voter History"], voter["Voter History 1"], voter["Voter History 2"], voter["Voter History 3"], voter["Voter History 4"]].filter(Boolean).map((history, index) => (
                              <div key={index} className="text-gray-600">
                                {history}
                              </div>
                            ))}
                          </div>
                        ) : '-'}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={11} className="h-24 text-center">
                      {voters.length === 0 ? 'No voter data available.' : 'No voters found matching your filters.'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            
            {filteredVoters.length > 100 && (
              <div className="mt-4 text-center text-sm text-gray-600">
                Showing first 100 results. Use filters to narrow down your search.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
