"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabaseClient"

interface Voter {
  "Voter ID": string;
  "First Name"?: string;
  "Last Name"?: string;
  "Political Party"?: string;
  "Precinct"?: string;
  "Ward"?: string;
  "Age"?: number;
  "Gender"?: string;
  "Voting Status"?: string;
}

export default function TheVanPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [voters, setVoters] = useState<Voter[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchVoters()
  }, [])

  async function fetchVoters() {
    try {
      setLoading(true)
      console.log("Fetching voters from Supabase...")
      const { data, error } = await supabase
        .from('Wentzville Voters')
        .select('*')
        .order('"Voter ID"', { ascending: true })
        .limit(1000)

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
    if (!searchTerm) return true
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    return (
      (voter["Voter ID"] && String(voter["Voter ID"]).toLowerCase().includes(lowerCaseSearchTerm)) ||
      (voter["First Name"] && voter["First Name"].toLowerCase().includes(lowerCaseSearchTerm)) ||
      (voter["Last Name"] && voter["Last Name"].toLowerCase().includes(lowerCaseSearchTerm)) ||
      (voter["Political Party"] && voter["Political Party"].toLowerCase().includes(lowerCaseSearchTerm)) ||
      (voter["Precinct"] && voter["Precinct"].toLowerCase().includes(lowerCaseSearchTerm)) ||
      (voter["Ward"] && voter["Ward"].toLowerCase().includes(lowerCaseSearchTerm))
    )
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
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Input
                placeholder="Search voters by name, party, precinct, or ward..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button onClick={fetchVoters} disabled={loading}>
                {loading ? 'Loading...' : 'Refresh'}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
              <span>Total Voters: {voters.length.toLocaleString()}</span>
              <span>•</span>
              <span>Filtered: {filteredVoters.length.toLocaleString()}</span>
              {searchTerm && (
                <>
                  <span>•</span>
                  <span>Search: "{searchTerm}"</span>
                </>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Voter ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Precinct</TableHead>
                  <TableHead>Ward</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Party</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVoters.length > 0 ? (
                  filteredVoters.map((voter) => (
                    <TableRow key={String(voter["Voter ID"])}>
                      <TableCell className="font-medium">{String(voter["Voter ID"]).slice(0, 8)}...</TableCell>
                      <TableCell>
                        {voter["First Name"]} {voter["Last Name"]}
                      </TableCell>
                      <TableCell>{voter["Age"] || '-'}</TableCell>
                      <TableCell>{voter["Gender"] || '-'}</TableCell>
                      <TableCell>{voter["Precinct"] || '-'}</TableCell>
                      <TableCell>{voter["Ward"] || '-'}</TableCell>
                      <TableCell>
                        {voter["Voting Status"] === "Active" ? '✅ Active' : '❌ Inactive'}
                      </TableCell>
                      <TableCell className="text-sm">
                        {voter["Political Party"] || '-'}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      {voters.length === 0 ? 'No voter data available.' : 'No voters found matching your search.'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
