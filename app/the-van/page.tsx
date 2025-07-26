"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabaseClient"
import { Search, Filter, RefreshCw, Users, MapPin, Vote } from "lucide-react"

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

  const getAge = (birthYear?: number) => {
    if (!birthYear) return null
    return new Date().getFullYear() - birthYear
  }

  const getVotingHistory = (voter: Voter) => {
    return [voter["Voter History"], voter["Voter History 1"], voter["Voter History 2"], voter["Voter History 3"], voter["Voter History 4"]].filter(Boolean)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="container mx-auto py-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-blue-900">
                CAPES Voter Database
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading voter data...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto py-8">
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg">
            <div className="text-center">
              <CardTitle className="text-3xl font-bold mb-2">
                🗳️ CAPES Voter Database
              </CardTitle>
              <p className="text-blue-100 text-lg">
                Search and analyze voter data for the Wentzville School District
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="lg:col-span-2 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, ID, address, or party..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-blue-500"
                  />
                </div>
                
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Filter by Precinct"
                    value={precinctFilter}
                    onChange={(e) => setPrecinctFilter(e.target.value)}
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500"
                  />
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Filter by Split"
                    value={splitFilter}
                    onChange={(e) => setSplitFilter(e.target.value)}
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <Button 
                  variant={targetVoterFilter === "target" ? "default" : "outline"}
                  onClick={() => setTargetVoterFilter(targetVoterFilter === "target" ? "" : "target")}
                  className="h-10 px-6"
                >
                  <Vote className="mr-2 h-4 w-4" />
                  Target Voters Only
                </Button>
                
                <Button 
                  variant={targetVoterFilter === "non-target" ? "default" : "outline"}
                  onClick={() => setTargetVoterFilter(targetVoterFilter === "non-target" ? "" : "non-target")}
                  className="h-10 px-6"
                >
                  <Users className="mr-2 h-4 w-4" />
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
                  className="h-10 px-6"
                >
                  Clear All Filters
                </Button>
              </div>

              <div className="flex justify-between items-center mb-6">
                <Button onClick={fetchVoters} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                  <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  {loading ? 'Loading...' : 'Refresh'}
                </Button>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <Badge variant="secondary" className="px-3 py-1">
                    <Users className="mr-1 h-3 w-3" />
                    Total: {voters.length.toLocaleString()}
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1">
                    Filtered: {filteredVoters.length.toLocaleString()}
                  </Badge>
                  {(searchTerm || precinctFilter || splitFilter || targetVoterFilter) && (
                    <Badge variant="destructive" className="px-3 py-1">
                      Filters Active
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-semibold text-gray-900">Voter ID</TableHead>
                    <TableHead className="font-semibold text-gray-900">Full Name</TableHead>
                    <TableHead className="font-semibold text-gray-900">Address</TableHead>
                    <TableHead className="font-semibold text-gray-900">Target Voter</TableHead>
                    <TableHead className="font-semibold text-gray-900">Party</TableHead>
                    <TableHead className="font-semibold text-gray-900">Age</TableHead>
                    <TableHead className="font-semibold text-gray-900">Precinct</TableHead>
                    <TableHead className="font-semibold text-gray-900">Split</TableHead>
                    <TableHead className="font-semibold text-gray-900">Ward</TableHead>
                    <TableHead className="font-semibold text-gray-900">Township</TableHead>
                    <TableHead className="font-semibold text-gray-900">Voting History</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVoters.length > 0 ? (
                    filteredVoters.slice(0, 100).map((voter) => (
                      <TableRow key={String(voter["Voter ID"])} className="hover:bg-blue-50 transition-colors">
                        <TableCell className="font-mono text-sm bg-gray-50">
                          {String(voter["Voter ID"]).slice(0, 8)}...
                        </TableCell>
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-semibold text-gray-900">
                              {voter["First Name"]} {voter["Last Name"]}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm max-w-xs">
                          {voter["Full Address"] ? (
                            <div className="truncate" title={voter["Full Address"]}>
                              {voter["Full Address"]}
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {voter["is_target_voter"] ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              ✅ Target
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-gray-600">
                              ❌ Not Target
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {voter["Political Party"] ? (
                            <Badge variant="secondary" className="text-xs">
                              {voter["Political Party"]}
                            </Badge>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {getAge(voter["Birth Year"]) ? (
                            <Badge variant="outline" className="text-xs">
                              {getAge(voter["Birth Year"])} years
                            </Badge>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {voter["Precinct"] || '-'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {voter["Split"] || '-'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs">
                          {voter["Ward"] || '-'}
                        </TableCell>
                        <TableCell className="text-xs">
                          {voter["Township"] || '-'}
                        </TableCell>
                        <TableCell className="text-xs max-w-xs">
                          {getVotingHistory(voter).length > 0 ? (
                            <div className="space-y-1">
                              {getVotingHistory(voter).slice(0, 3).map((history, index) => (
                                <div key={index} className="text-gray-600 bg-gray-50 px-2 py-1 rounded text-xs">
                                  {history}
                                </div>
                              ))}
                              {getVotingHistory(voter).length > 3 && (
                                <div className="text-gray-400 text-xs">
                                  +{getVotingHistory(voter).length - 3} more
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={11} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <Users className="h-12 w-12 mb-4 text-gray-300" />
                          <p className="text-lg font-medium">
                            {voters.length === 0 ? 'No voter data available.' : 'No voters found matching your filters.'}
                          </p>
                          <p className="text-sm mt-2">
                            Try adjusting your search terms or filters.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            {filteredVoters.length > 100 && (
              <div className="mt-6 text-center">
                <Badge variant="outline" className="px-4 py-2">
                  Showing first 100 results. Use filters to narrow down your search.
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
