export type Voter = {
  id: string
  name: string
  address: string
  phone: string
  party: string
  status: "Registered" | "Unregistered"
  lastContact: string
  notes: string
}

export const mockVoters: Voter[] = [
  {
    id: "V001",
    name: "Alice Johnson",
    address: "123 Main St, Anytown, USA",
    phone: "555-123-4567",
    party: "Democrat",
    status: "Registered",
    lastContact: "2024-06-15",
    notes: "Strong supporter, interested in local issues.",
  },
  {
    id: "V002",
    name: "Bob Smith",
    address: "456 Oak Ave, Anytown, USA",
    phone: "555-987-6543",
    party: "Republican",
    status: "Registered",
    lastContact: "2024-05-20",
    notes: "Undecided, focus on economic policy.",
  },
  {
    id: "V003",
    name: "Charlie Brown",
    address: "789 Pine Ln, Anytown, USA",
    phone: "555-555-1212",
    party: "Independent",
    status: "Registered",
    lastContact: "2024-07-01",
    notes: "New resident, needs information on local elections.",
  },
  {
    id: "V004",
    name: "Diana Prince",
    address: "101 Elm St, Anytown, USA",
    phone: "555-111-2222",
    party: "Democrat",
    status: "Registered",
    lastContact: "2024-06-28",
    notes: "Volunteer potential, passionate about environmental issues.",
  },
  {
    id: "V005",
    name: "Eve Adams",
    address: "202 Birch Rd, Anytown, USA",
    phone: "555-333-4444",
    party: "Unaffiliated",
    status: "Unregistered",
    lastContact: "N/A",
    notes: "Recently moved, needs help registering.",
  },
]
