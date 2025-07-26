"use client"

import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, RefreshCw, Users, MapPin, Vote, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

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

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function TheVanPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [voters, setVoters] = useState<Voter[]>([])
  const [loading, setLoading] = useState(false)
  const [precinctFilter, setPrecinctFilter] = useState("")
  const [splitFilter, setSplitFilter] = useState("")
  const [targetVoterFilter, setTargetVoterFilter] = useState("")
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 100,
    total: 0,
    totalPages: 0
  })

  const fetchVoters = useCallback(async () => {
    try {
      setLoading(true)
      console.log("Fetching voters with pagination...")
      
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search: searchTerm,
        precinct: precinctFilter,
        split: splitFilter,
        targetVoter: targetVoterFilter
      })

      const response = await fetch(`/api/voters?${params}`)
      const result = await response.json()

      if (result.success) {
        console.log(`Successfully fetched ${result.data.length} voters (page ${result.pagination.page}, total: ${result.pagination.total})`)
        setVoters(result.data)
        setPagination(result.pagination)
      } else {
        console.error('Error fetching voters:', result.error)
        setVoters([])
      }
    } catch (err) {
      console.error('Failed to fetch voters:', err)
      setVoters([])
    } finally {
      setLoading(false)
    }
  }, [pagination.page, searchTerm, precinctFilter, splitFilter, targetVoterFilter])

  useEffect(() => {
    fetchVoters()
  }, [fetchVoters])

  const handleSearch = () => {
    setSearchTerm(searchInput)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const getAge = (birthYear?: number) => {
    if (!birthYear) return null
    return new Date().getFullYear() - birthYear
  }

  const getVotingHistory = (voter: Voter) => {
    return [voter["Voter History"], voter["Voter History 1"], voter["Voter History 2"], voter["Voter History 3"], voter["Voter History 4"]].filter(Boolean)
  }

  const goToPage = (page: number) => {
    setPagination(prev => ({ ...prev, page }))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSearchInput("")
    setPrecinctFilter("")
    setSplitFilter("")
    setTargetVoterFilter("")
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  if (loading && voters.length === 0) {
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
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="lg:col-span-2 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, ID, address, or party..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-blue-500"
                  />
                </div>
                
                <Button 
                  onClick={handleSearch}
                  className="h-12 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                
                <Select value={precinctFilter} onValueChange={setPrecinctFilter}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Filter by Precinct" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Precincts</SelectItem>
                    {Array.from({ length: 20 }, (_, i) => i + 1).map(precinct => (
                      <SelectItem key={precinct} value={precinct.toString()}>
                        Precinct {precinct}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Select value={splitFilter} onValueChange={setSplitFilter}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Filter by Split" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Splits</SelectItem>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(split => (
                      <SelectItem key={split} value={split.toString()}>
                        Split {split}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={targetVoterFilter} onValueChange={setTargetVoterFilter}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Target Voter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Voters</SelectItem>
                    <SelectItem value="target">Yes</SelectItem>
                    <SelectItem value="non-target">No</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-3">
                  <Button onClick={fetchVoters} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                    <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    {loading ? 'Loading...' : 'Refresh'}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={clearFilters}
                    className="px-6"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>

              <div className="flex justify-end items-center mb-4">
                <div className="flex flex-wrap gap-4 text-sm">
                  <Badge variant="secondary" className="px-3 py-1">
                    <Users className="mr-1 h-3 w-3" />
                    Total: {pagination.total.toLocaleString()}
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1">
                    Showing: {voters.length.toLocaleString()}
                  </Badge>
                  {(searchTerm || precinctFilter || splitFilter || targetVoterFilter) && (
                    <Badge variant="destructive" className="px-3 py-1">
                      Filters Active
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Pagination Above Table */}
            {pagination.totalPages > 1 && (
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing page {pagination.page} of {pagination.totalPages} 
                  ({((pagination.page - 1) * pagination.limit + 1).toLocaleString()} - {Math.min(pagination.page * pagination.limit, pagination.total).toLocaleString()} of {pagination.total.toLocaleString()} voters)
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(1)}
                    disabled={pagination.page === 1 || loading}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(pagination.page - 1)}
                    disabled={pagination.page === 1 || loading}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      const pageNum = Math.max(1, Math.min(pagination.totalPages - 4, pagination.page - 2)) + i;
                      if (pageNum > pagination.totalPages) return null;
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={pageNum === pagination.page ? "default" : "outline"}
                          size="sm"
                          onClick={() => goToPage(pageNum)}
                          disabled={loading}
                          className="w-8 h-8"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages || loading}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(pagination.totalPages)}
                    disabled={pagination.page === pagination.totalPages || loading}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-semibold text-gray-900 text-xs w-16">Voter ID</TableHead>
                    <TableHead className="font-semibold text-gray-900 text-sm">Voter Information</TableHead>
                    <TableHead className="font-semibold text-gray-900 text-xs">Age</TableHead>
                    <TableHead className="font-semibold text-gray-900 text-xs">Precinct</TableHead>
                    <TableHead className="font-semibold text-gray-900 text-xs">Split</TableHead>
                    <TableHead className="font-semibold text-gray-900 text-xs">Ward</TableHead>
                    <TableHead className="font-semibold text-gray-900 text-xs">Township</TableHead>
                    <TableHead className="font-semibold text-gray-900 text-xs">Voting History</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {voters.length > 0 ? (
                    voters.map((voter) => (
                      <TableRow key={String(voter["Voter ID"])} className="hover:bg-blue-50 transition-colors">
                        <TableCell className="font-mono text-xs bg-gray-50 py-1">
                          {voter["Voter ID"]}
                        </TableCell>
                        <TableCell className="py-1">
                          <div className="space-y-0.5">
                            <div className="font-semibold text-base text-gray-900 leading-tight">
                              {voter["First Name"]} {voter["Last Name"]}
                            </div>
                            <div className="text-xs text-gray-600 leading-tight">
                              {voter["Full Address"] || '-'}
                            </div>
                            <div className="flex gap-1 flex-wrap">
                              {voter["Political Party"] && (
                                <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                                  {voter["Political Party"]}
                                </Badge>
                              )}
                              {voter["is_target_voter"] ? (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs px-1.5 py-0.5">
                                  ✅ Target
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-gray-600 text-xs px-1.5 py-0.5">
                                  ❌ Not Target
                                </Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-1">
                          {getAge(voter["Birth Year"]) ? (
                            <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                              {getAge(voter["Birth Year"])}y
                            </Badge>
                          ) : (
                            <span className="text-gray-400 text-xs">-</span>
                          )}
                        </TableCell>
                        <TableCell className="py-1">
                          <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                            {voter["Precinct"] || '-'}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-1">
                          <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                            {voter["Split"] || '-'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs py-1">
                          {voter["Ward"] || '-'}
                        </TableCell>
                        <TableCell className="text-xs py-1">
                          {voter["Township"] || '-'}
                        </TableCell>
                        <TableCell className="text-xs py-1 max-w-48">
                          {getVotingHistory(voter).length > 0 ? (
                            <div className="space-y-0.5">
                              {getVotingHistory(voter).slice(0, 3).map((history, index) => (
                                <div key={index} className="text-gray-600 bg-gray-50 px-1.5 py-0.5 rounded text-xs leading-tight">
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
                      <TableCell colSpan={8} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <Users className="h-12 w-12 mb-4 text-gray-300" />
                          <p className="text-lg font-medium">
                            {pagination.total === 0 ? 'No voter data available.' : 'No voters found matching your filters.'}
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
