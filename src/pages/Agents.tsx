import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Search,
  Plus,
  Edit,
  Copy,
  Trash2,
  MessageSquare,
  Instagram,
  MessagesSquare,
  Filter,
} from "lucide-react";

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
];

export default function Agents() {
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredAgents = mockAgents.filter((agent) => {
    const matchesSearch = agent.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && agent.status) ||
      (statusFilter === "inactive" && !agent.status);
    return matchesSearch && matchesStatus;
  });

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
                      onClick={() => setSelectedAgent(agent.id)}
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

      <Sheet open={selectedAgent !== null} onOpenChange={() => setSelectedAgent(null)}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Agent Details</SheetTitle>
            <SheetDescription>
              View and manage agent configuration
            </SheetDescription>
          </SheetHeader>
          <div className="py-6 space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Configuration</h3>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Name</label>
                  <Input defaultValue="Customer Support Bot" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Description</label>
                  <Input defaultValue="24/7 customer support assistant" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Integrations</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
                <Button variant="outline" className="justify-start">
                  <Instagram className="mr-2 h-4 w-4" />
                  Instagram
                </Button>
                <Button variant="outline" className="justify-start">
                  <MessagesSquare className="mr-2 h-4 w-4" />
                  Web Chat
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}