import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Filter } from "lucide-react"
import { AgentsList } from "@/components/agents/AgentsList"
import { AgentDetails } from "@/components/agents/AgentDetails"

// Mock data for demonstration
const mockAgents = [
  {
    id: 1,
    name: "Customer Support Bot",
    status: true,
    lastUpdate: "2024-03-10",
    interactions: 1234,
  },
  {
    id: 2,
    name: "Sales Assistant",
    status: false,
    lastUpdate: "2024-03-09",
    interactions: 856,
  },
]

export default function Agents() {
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredAgents = mockAgents.filter((agent) => {
    const matchesSearch = agent.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && agent.status) ||
      (statusFilter === "inactive" && !agent.status)
    return matchesSearch && matchesStatus
  })

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">AI Agents</h1>
        <Button className="bg-gradient-primary">
          <Plus className="mr-2 h-4 w-4" />
          Create New Agent
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <AgentsList 
        filteredAgents={filteredAgents} 
        onSelectAgent={setSelectedAgent} 
      />

      <AgentDetails 
        selectedAgent={selectedAgent} 
        onClose={() => setSelectedAgent(null)} 
      />
    </div>
  )
}