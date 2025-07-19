"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockVoters } from "@/lib/mock-data"

export default function MinivanPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredVoters = useMemo(() => {
    if (!searchTerm) {
      return mockVoters
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    return mockVoters.filter(
      (voter) =>
        voter.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        voter.address.toLowerCase().includes(lowerCaseSearchTerm),
    )
  }, [searchTerm])

  const handleLogInteraction = (voterId: string, interactionType: string) => {
    console.log(`Logged ${interactionType} for voter ID: ${voterId}`)
    // In a real app, this would update a database
    alert(`Interaction logged: ${interactionType} for ${voterId}`)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Minivan (Canvassing Tool Mimicry)</CardTitle>
          <CardDescription>Search for voters and log interactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search voter by name or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredVoters.length > 0 ? (
          filteredVoters.map((voter) => (
            <Card key={voter.id}>
              <CardHeader>
                <CardTitle>{voter.name}</CardTitle>
                <CardDescription>{voter.address}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  <strong>Party:</strong> {voter.party}
                </p>
                <p>
                  <strong>Status:</strong> {voter.status}
                </p>
                <p>
                  <strong>Phone:</strong> {voter.phone}
                </p>
                <p>
                  <strong>Last Contact:</strong> {voter.lastContact}
                </p>
                <p className="mt-2">
                  <strong>Notes:</strong> {voter.notes}
                </p>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => handleLogInteraction(voter.id, "Spoke")}>
                  Spoke
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleLogInteraction(voter.id, "Not Home")}>
                  Not Home
                </Button>
                <Button size="sm" variant="secondary" onClick={() => handleLogInteraction(voter.id, "Refused")}>
                  Refused
                </Button>
                {/* Add more interaction types as needed */}
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">No voters found matching your search.</p>
        )}
      </div>
    </div>
  )
}
