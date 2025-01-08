import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Edit, Copy, Trash2, MessageSquare, Instagram, MessagesSquare } from "lucide-react"

interface AgentsListProps {
  filteredAgents: Array<{
    id: number;
    name: string;
    status: boolean;
    lastUpdate: string;
    interactions: number;
  }>;
  onSelectAgent: (id: number) => void;
}

export function AgentsList({ filteredAgents, onSelectAgent }: AgentsListProps) {
  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Update</TableHead>
            <TableHead>Monthly Interactions</TableHead>
            <TableHead>Integrations</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAgents.map((agent) => (
            <TableRow key={agent.id}>
              <TableCell className="font-medium">{agent.name}</TableCell>
              <TableCell>
                <Switch checked={agent.status} />
              </TableCell>
              <TableCell>{new Date(agent.lastUpdate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge variant="secondary">{agent.interactions}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <Instagram className="h-4 w-4 text-muted-foreground" />
                  <MessagesSquare className="h-4 w-4 text-muted-foreground" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onSelectAgent(agent.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}