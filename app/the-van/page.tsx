"use client"

import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Users, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

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
  const [precinctFilter, setPrecinctFilter] = useState("all")
  const [splitFilter, setSplitFilter] = useState("all")
  const [targetVoterFilter, setTargetVoterFilter] = useState("all")
  const [partyFilter, setPartyFilter] = useState("all")
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 100,
    total: 0,
    totalPages: 0
  })

  const getAge = (birthYear?: number) => {
    if (!birthYear) return null
    return new Date().getFullYear() - birthYear
  }

  const getVotingHistory = (voter: Voter) => {
    const history = []
    if (voter["Voter History"]) history.push(voter["Voter History"])
    if (voter["Voter History 1"]) history.push(voter["Voter History 1"])
    if (voter["Voter History 2"]) history.push(voter["Voter History 2"])
    if (voter["Voter History 3"]) history.push(voter["Voter History 3"])
    if (voter["Voter History 4"]) history.push(voter["Voter History 4"])
    if (voter["Voter History 5"]) history.push(voter["Voter History 5"])
    return history.filter(h => h && h.trim() !== "")
  }

  const fetchVoters = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search: searchTerm,
        precinct: precinctFilter,
        split: splitFilter,
        targetVoter: targetVoterFilter,
        party: partyFilter
      })

      const response = await fetch(`/api/voters?${params}`)
      const result = await response.json()

      if (result.success) {
        setVoters(result.data)
        setPagination(result.pagination)
      } else {
        setVoters([])
      }
    } catch (err) {
      setVoters([])
    } finally {
      setLoading(false)
    }
  }, [pagination.page, searchTerm, precinctFilter, splitFilter, targetVoterFilter, partyFilter])

  useEffect(() => {
    fetchVoters()
  }, [fetchVoters])

  const handleSearch = () => {
    setSearchTerm(searchInput)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setSearchInput("")
    setPrecinctFilter("all")
    setSplitFilter("all")
    setTargetVoterFilter("all")
    setPartyFilter("all")
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto py-8">
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg">
            <CardTitle className="text-center">
              <div className="tracking-tight text-3xl font-bold mb-2">🗳️ CAPES Voter Database</div>
              <p className="text-blue-100 text-lg">Search and analyze voter data for the Wentzville School District</p>
            </CardTitle>
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
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-blue-500"
                  />
                </div>
                <Button onClick={handleSearch} className="h-12 bg-blue-600 hover:bg-blue-700 text-white">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <Select value={splitFilter} onValueChange={setSplitFilter}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="All Splits" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Splits</SelectItem>
                    <SelectItem value="1">Split 1</SelectItem>
                    <SelectItem value="2">Split 2</SelectItem>
                    <SelectItem value="3">Split 3</SelectItem>
                    <SelectItem value="4">Split 4</SelectItem>
                    <SelectItem value="5">Split 5</SelectItem>
                    <SelectItem value="6">Split 6</SelectItem>
                    <SelectItem value="10">Split 10</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Select value={targetVoterFilter} onValueChange={setTargetVoterFilter}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Target Voters" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Target Voters</SelectItem>
                    <SelectItem value="true">Target Only</SelectItem>
                    <SelectItem value="false">Non-Target Only</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={partyFilter} onValueChange={setPartyFilter}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="All Parties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Parties</SelectItem>
                    <SelectItem value="Democratic">Democratic</SelectItem>
                    <SelectItem value="Republican">Republican</SelectItem>
                    <SelectItem value="Unaffiliated">Unaffiliated</SelectItem>
                    <SelectItem value="Libertarian">Libertarian</SelectItem>
                    <SelectItem value="Constitution">Constitution</SelectItem>
                    <SelectItem value="Green">Green</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={precinctFilter} onValueChange={setPrecinctFilter}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="All Precincts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Precincts</SelectItem>
                    <SelectItem value="108">108</SelectItem>
                    <SelectItem value="109">109</SelectItem>
                    <SelectItem value="111">111</SelectItem>
                    <SelectItem value="112">112</SelectItem>
                    <SelectItem value="113">113</SelectItem>
                    <SelectItem value="115">115</SelectItem>
                    <SelectItem value="201">201</SelectItem>
                    <SelectItem value="202">202</SelectItem>
                    <SelectItem value="203">203</SelectItem>
                    <SelectItem value="204">204</SelectItem>
                    <SelectItem value="205">205</SelectItem>
                    <SelectItem value="206">206</SelectItem>
                    <SelectItem value="208">208</SelectItem>
                    <SelectItem value="209">209</SelectItem>
                    <SelectItem value="210">210</SelectItem>
                    <SelectItem value="211">211</SelectItem>
                    <SelectItem value="212">212</SelectItem>
                    <SelectItem value="314">314</SelectItem>
                    <SelectItem value="315">315</SelectItem>
                    <SelectItem value="316">316</SelectItem>
                    <SelectItem value="414">414</SelectItem>
                    <SelectItem value="415">415</SelectItem>
                    <SelectItem value="417">417</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleClearFilters} variant="outline" className="h-12">
                  Clear All Filters
                </Button>
              </div>
              <div className="flex justify-end items-center mb-4">
                <div className="flex flex-wrap gap-4 text-sm">
                  <Badge variant="secondary" className="px-3 py-1">
                    <Users className="mr-1 h-3 w-3" />
                    Total: {pagination.total.toLocaleString()}
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1">
                    Showing: {voters.length}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-semibold text-gray-900 text-xs w-16">Voter ID</TableHead>
                    <TableHead className="font-semibold text-gray-900 text-xs w-48">Voter Information</TableHead>
                    <TableHead className="font-semibold text-gray-900 text-xs w-20 text-center">Target Status</TableHead>
                    <TableHead className="font-semibold text-gray-900 text-xs w-40">Voting History</TableHead>
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
                          <div className="space-y-1">
                            <div className="font-semibold text-sm text-gray-900 leading-tight">
                              {voter["First Name"]} {voter["Last Name"]}
                            </div>
                            <div className="text-xs text-gray-600 leading-tight">
                              {voter["Full Address"] || '-'}
                            </div>
                            <div className="text-xs text-gray-500">
                              Age: {getAge(voter["Birth Year"]) || '-'}
                            </div>
                            <div className="text-xs text-gray-500">
                              Precinct: {voter["Precinct"] || '-'} | Split: {voter["Split"] || '-'} | Ward: {voter["Ward"] || '-'}
                            </div>
                            <div className="text-xs text-gray-500">
                              Township: {voter["Township"] || '-'}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              Party: {voter["Political Party"] || '-'}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-1 text-center">
                          {voter["is_target_voter"] ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs px-1.5 py-0.5">
                              ✅ Target
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-gray-600 text-xs px-1.5 py-0.5">
                              ❌ Not Target
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-xs py-1 pl-4">
                          {getVotingHistory(voter).length > 0 ? (
                            <ul className="space-y-0.5 list-disc list-inside">
                              {getVotingHistory(voter).slice(0, 5).map((history, index) => (
                                <li key={index} className="text-gray-600 text-xs leading-tight">
                                  {history}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-32 text-center">
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

            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-700">
                  Showing page {pagination.page} of {pagination.totalPages} ({((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total.toLocaleString()} voters)
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(1)}
                    disabled={pagination.page === 1}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(pagination.totalPages - 4, pagination.page - 2)) + i
                    return (
                      <Button
                        key={pageNum}
                        variant={pagination.page === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className="w-8 h-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.totalPages)}
                    disabled={pagination.page === pagination.totalPages}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
