
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Contact } from "@/types/chat";
import { Search } from "lucide-react";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Broadcasts() {
  const { toast } = useToast();
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [selectedFlow, setSelectedFlow] = useState("");
  
  const mockContacts: Contact[] = [
    {
      id: 1,
      phone: "+55 11 99999-9999",
      name: "João Silva",
      date: "2024-02-20",
      funnelName: "Venda Ativa",
      funnelStatus: "in_progress"
    },
    {
      id: 2,
      phone: "+55 11 88888-8888",
      name: "Maria Santos",
      date: "2024-02-19",
      funnelName: "Pós-Venda",
      funnelStatus: "completed"
    },
    {
      id: 3,
      phone: "+55 11 77777-7777",
      name: "Pedro Oliveira",
      date: "2024-02-18",
      funnelName: "Recuperação",
      funnelStatus: "pending"
    },
    {
      id: 4,
      phone: "+55 11 66666-6666",
      name: "Ana Costa",
      date: "2024-02-17",
      funnelName: "Venda Ativa",
      funnelStatus: "in_progress"
    },
    {
      id: 5,
      phone: "+55 11 55555-5555",
      name: "Lucas Ferreira",
      date: "2024-02-16",
      funnelName: "Pós-Venda",
      funnelStatus: "completed"
    }
  ];

  const mockFlows = [
    { id: "1", name: "Funil de Vendas" },
    { id: "2", name: "Pós-Venda" },
    { id: "3", name: "Reativação" },
  ];

  const handleSelectAllContacts = (checked: boolean) => {
    if (checked) {
      setSelectedContacts(mockContacts.map(contact => contact.id.toString()));
    } else {
      setSelectedContacts([]);
    }
  };

  const handleContactSelect = (contactId: string) => {
    setSelectedContacts(prev => {
      if (prev.includes(contactId)) {
        return prev.filter(id => id !== contactId);
      }
      return [...prev, contactId];
    });
  };

  const handleSendBroadcast = () => {
    if (!selectedFlow) {
      toast({
        title: "Selecione um fluxo",
        description: "É necessário selecionar um fluxo para enviar o disparo.",
        variant: "destructive",
      });
      return;
    }

    if (selectedContacts.length === 0) {
      toast({
        title: "Selecione contatos",
        description: "É necessário selecionar pelo menos um contato para enviar o disparo.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Disparo iniciado",
      description: `Iniciando disparo para ${selectedContacts.length} contatos.`,
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Disparos em Massa</h1>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <Select value={selectedFlow} onValueChange={setSelectedFlow}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um fluxo" />
                </SelectTrigger>
                <SelectContent>
                  {mockFlows.map(flow => (
                    <SelectItem key={flow.id} value={flow.id}>
                      {flow.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleSendBroadcast}
              disabled={selectedContacts.length === 0 || !selectedFlow}
            >
              Enviar Disparo
            </Button>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar contatos..."
              className="pl-10 max-w-md"
            />
          </div>

          <div className="border rounded-lg bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedContacts.length === mockContacts.length}
                      onCheckedChange={handleSelectAllContacts}
                    />
                  </TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Funil</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedContacts.includes(contact.id.toString())}
                        onCheckedChange={() => handleContactSelect(contact.id.toString())}
                      />
                    </TableCell>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell>{contact.date}</TableCell>
                    <TableCell>{contact.funnelName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          contact.funnelStatus === 'completed' ? 'bg-green-500' :
                          contact.funnelStatus === 'in_progress' ? 'bg-yellow-500' :
                          'bg-gray-500'
                        }`} />
                        {contact.funnelStatus === 'completed' ? 'Concluído' :
                         contact.funnelStatus === 'in_progress' ? 'Em Andamento' :
                         'Pendente'}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
