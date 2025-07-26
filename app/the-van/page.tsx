"use client"

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClientOnly } from "@/components/client-only"
import { mockVoters } from "@/lib/mock-data"
import { supabase } from "@/lib/supabaseClient"

interface Voter {
  "Voter ID": string;
  "Age"?: number;
  "Gender"?: string;
  "Precinct"?: string;
  "Ward"?: string;
  "Voting Status"?: string;
  "First Name"?: string;
  "Last Name"?: string;
  "Middle Name"?: string;
  "Suffix"?: string;
  "Address"?: string;
  "City"?: string;
  "State"?: string;
  "Zip Code"?: string;
  "Political Party"?: string;
  "Registration Date"?: string;
  "Last Vote Date"?: string;}

interface Category {
  "Voter ID": string;
  name: string;
  description: string;
  count: number;
  color: string;
  type: 'demographic' | 'geographic' | 'voting' | 'priority';
}

export default function TheVanPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [voters, setVoters] = useState<Voter[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("voters")

  // Fetch real voter data from Supabase
  useEffect(() => {
    fetchVoters()
  }, [])

  async function fetchVoters() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('Wentzville Voters')
        .select('*')
        .order('"Voter ID"', { ascending: true })

      if (error) {
        console.error('Error fetching voters:', error)
        // Fallback to mock data if Supabase fails
        setVoters([])
      } else {
        setVoters(data || [])
      }
    } catch (err) {
      console.error('Failed to fetch voters:', err)
      setVoters([])
    } finally {
      setLoading(false)
    }
  }

  // Filter voters based on search term
  const filteredVoters = useMemo(() => {
    if (!searchTerm) {
      return voters
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    return voters.filter(
      (voter) =>
        voter["Voter ID"]?.toLowerCase().includes(lowerCaseSearchTerm) ||
        voter["Ward"]?.toLowerCase().includes(lowerCaseSearchTerm) ||
        voter["Precinct"]?.toLowerCase().includes(lowerCaseSearchTerm) ||
        voter["Gender"]?.toLowerCase().includes(lowerCaseSearchTerm)
        voter["First Name"]?.toLowerCase().includes(lowerCaseSearchTerm) ||
        voter["Last Name"]?.toLowerCase().includes(lowerCaseSearchTerm) ||
        voter["Address"]?.toLowerCase().includes(lowerCaseSearchTerm) ||
        voter["City"]?.toLowerCase().includes(lowerCaseSearchTerm) ||
        voter["State"]?.toLowerCase().includes(lowerCaseSearchTerm) ||
        voter["Zip Code"]?.toLowerCase().includes(lowerCaseSearchTerm) ||
        voter["Political Party"]?.toLowerCase().includes(lowerCaseSearchTerm) ||    )
  }, [voters, searchTerm])

  // Calculate categories from voter data
  const calculateCategories = (): Category[] => {
    if (!voters.length) return []

    // Demographic Categories
    const ageGroups = {
      '18-25': voters.filter(v => v["Age"] && (2024 - v["Age"]) >= 18 && (2024 - v["Age"]) <= 25).length,
      '26-35': voters.filter(v => v["Age"] && (2024 - v["Age"]) >= 26 && (2024 - v["Age"]) <= 35).length,
      '36-50': voters.filter(v => v["Age"] && (2024 - v["Age"]) >= 36 && (2024 - v["Age"]) <= 50).length,
      '51-65': voters.filter(v => v["Age"] && (2024 - v["Age"]) >= 51 && (2024 - v["Age"]) <= 65).length,
      '65+': voters.filter(v => v["Age"] && (2024 - v["Age"]) > 65).length,
    }

    const genderGroups = {
      'Male': voters.filter(v => v["Gender"] === 'M').length,
      'Female': voters.filter(v => v["Gender"] === 'F').length,
      'Other': voters.filter(v => v["Gender"] && !['M', 'F'].includes(v["Gender"])).length,
    }

    // Geographic Categories
    const wards = voters.reduce((acc, voter) => {
      const ward = voter["Ward"] || 'Unknown'
      acc[ward] = (acc[ward] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const precincts = voters.reduce((acc, voter) => {
      const precinct = voter["Precinct"] || 'Unknown'
      acc[precinct] = (acc[precinct] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Voting Categories
    const activeVoters = voters.filter(v => v["Voting Status"] === "Active").length
    const inactiveVoters = voters.filter(v => !v["Voting Status"] === "Active").length

    const votingHistory = {
      'Frequent Voters': voters.filter(v => 
          .filter(Boolean).length >= 3
      ).length,
      'Occasional Voters': voters.filter(v => 
          .filter(Boolean).length === 2
      ).length,
      'Rare Voters': voters.filter(v => 
          .filter(Boolean).length === 1
      ).length,
      'Non-Voters': voters.filter(v => 
          .some(Boolean)
      ).length,
    }

    // Priority Categories
    const highPriority = voters.filter(v => 
        .filter(Boolean).length >= 2
    ).length

    const mediumPriority = voters.filter(v => 
        .filter(Boolean).length === 1
    ).length

    const lowPriority = voters.filter(v => 
        .some(Boolean)
    ).length

    const categories: Category[] = [
      // Demographic Categories
      ...Object.entries(ageGroups).map(([name, count]) => ({
        id: `age-${name}`,
        name,
        description: `Voters aged ${name}`,
        count,
        color: 'bg-blue-100 text-blue-800',
        type: 'demographic' as const
      })),
      ...Object.entries(genderGroups).map(([name, count]) => ({
        id: `gender-${name}`,
        name,
        description: `${name} voters`,
        count,
        color: 'bg-purple-100 text-purple-800',
        type: 'demographic' as const
      })),

      // Geographic Categories
      ...Object.entries(wards).map(([name, count]) => ({
        id: `ward-${name}`,
        name: `Ward ${name}`,
        description: `Voters in Ward ${name}`,
        count,
        color: 'bg-green-100 text-green-800',
        type: 'geographic' as const
      })),
      ...Object.entries(precincts).map(([name, count]) => ({
        id: `precinct-${name}`,
        name: `Precinct ${name}`,
        description: `Voters in Precinct ${name}`,
        count,
        color: 'bg-yellow-100 text-yellow-800',
        type: 'geographic' as const
      })),

      // Voting Categories
      {
        id: 'active-voters',
        name: 'Active Voters',
        description: 'Currently active registered voters',
        count: activeVoters,
        color: 'bg-green-100 text-green-800',
        type: 'voting'
      },
      {
        id: 'inactive-voters',
        name: 'Inactive Voters',
        description: 'Inactive or unregistered voters',
        count: inactiveVoters,
        color: 'bg-red-100 text-red-800',
        type: 'voting'
      },
      ...Object.entries(votingHistory).map(([name, count]) => ({
        id: `history-${name.toLowerCase().replace(' ', '-')}`,
        name,
        description: `Voters with ${name.toLowerCase()} pattern`,
        count,
        color: 'bg-indigo-100 text-indigo-800',
        type: 'voting' as const
      })),

      // Priority Categories
      {
        id: 'high-priority',
        name: 'High Priority',
        description: 'Active voters with good voting history',
        count: highPriority,
        color: 'bg-red-100 text-red-800',
        type: 'priority'
      },
      {
        id: 'medium-priority',
        name: 'Medium Priority',
        description: 'Active voters with some voting history',
        count: mediumPriority,
        color: 'bg-yellow-100 text-yellow-800',
        type: 'priority'
      },
      {
        id: 'low-priority',
        name: 'Low Priority',
        description: 'Inactive voters or those with no voting history',
        count: lowPriority,
        color: 'bg-gray-100 text-gray-800',
        type: 'priority'
      }
    ]

    return categories.filter(cat => cat.count > 0)
  }

  const categories = calculateCategories()

  const getCategoryTypeLabel = (type: string) => {
    const labels = {
      demographic: 'Demographics',
      geographic: 'Geographic',
      voting: 'Voting',
      priority: 'Priority'
    }
    return labels[type as keyof typeof labels] || type
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>CAPES Voter Database (Voter Database)</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Loading voter data...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>CAPES Voter Database (Voter Database)</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientOnly fallback={<p>Loading...</p>}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="voters">Voter Database ({voters.length})</TabsTrigger>
                <TabsTrigger value="categories">Categories ({categories.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="voters" className="space-y-4">
                <div className="mb-4">
                  <Input
                    placeholder="Search voters by ID, ward, precinct, or gender..."
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
                        <TableHead>Birth Year</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Precinct</TableHead>
                        <TableHead>Ward</TableHead>
                        <TableHead>Active</TableHead>
                        <TableHead>Vote History</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVoters.length > 0 ? (
                        filteredVoters.map((voter) => (
                          <TableRow key={voter["Voter ID"]}>
                            <TableCell className="font-medium">{voter["Voter ID"].slice(0, 8)}...</TableCell>
                            <TableCell>{voter["Age"] || '-'}</TableCell>
                            <TableCell>{voter["Gender"] || '-'}</TableCell>
        voter["First Name"]?.toLowerCase().includes(lowerCaseSearchTerm) ||
        voter["Last Name"]?.toLowerCase().includes(lowerCaseSearchTerm) ||
        voter["Address"]?.toLowerCase().includes(lowerCaseSearchTerm) ||
        voter["City"]?.toLowerCase().includes(lowerCaseSearchTerm) ||
        voter["State"]?.toLowerCase().includes(lowerCaseSearchTerm) ||
        voter["Zip Code"]?.toLowerCase().includes(lowerCaseSearchTerm) ||
        voter["Political Party"]?.toLowerCase().includes(lowerCaseSearchTerm) ||                            <TableCell>{voter["Precinct"] || '-'}</TableCell>
                            <TableCell>{voter["Ward"] || '-'}</TableCell>
                            <TableCell>
                              {voter["Voting Status"] === "Active" ? '✅ Active' : '❌ Inactive'}
                            <TableCell className="text-sm">
                              {voter["Political Party"] || "-"}
                            </TableCell>                            </TableCell>
                            <TableCell className="text-sm">
                              {[
                              ].join('-')}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            {voters.length === 0 ? 'No voter data available.' : 'No voters found matching your search.'}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="categories" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <Card key={category.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{category.name}</CardTitle>
                          <Badge className={category.color}>
                            {category.count}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500 uppercase">
                            {getCategoryTypeLabel(category.type)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </ClientOnly>
        </CardContent>
      </Card>
    </div>
  )
}
