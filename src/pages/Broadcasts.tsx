import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Contact } from "@/types/chat";
import { Search } from "lucide-react";

export default function Broadcasts() {
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transmissões</h1>
        <Button>Nova Transmissão</Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar contatos..."
          className="pl-10 max-w-md"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Funil</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockContacts.map((contact) => (
              <TableRow key={contact.id}>
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
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Visualizar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
