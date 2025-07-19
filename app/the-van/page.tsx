"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockVoters } from "@/lib/mock-data"

export default function TheVanPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredVoters = useMemo(() => {
    if (!searchTerm) {
      return mockVoters
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    return mockVoters.filter(
      (voter) =>
        voter.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        voter.address.toLowerCase().includes(lowerCaseSearchTerm) ||
        voter.party.toLowerCase().includes(lowerCaseSearchTerm) ||
        voter.notes.toLowerCase().includes(lowerCaseSearchTerm),
    )
  }, [searchTerm])

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>The Van (Voter Database Mimicry)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search voters by name, address, party, or notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Party</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVoters.length > 0 ? (
                  filteredVoters.map((voter) => (
                    <TableRow key={voter.id}>
                      <TableCell className="font-medium">{voter.id}</TableCell>
                      <TableCell>{voter.name}</TableCell>
                      <TableCell>{voter.address}</TableCell>
                      <TableCell>{voter.phone}</TableCell>
                      <TableCell>{voter.party}</TableCell>
                      <TableCell>{voter.status}</TableCell>
                      <TableCell>{voter.lastContact}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{voter.notes}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No voters found.
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
