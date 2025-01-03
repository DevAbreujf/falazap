import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Square } from "lucide-react";

interface Broadcast {
  id: string;
  name: string;
  phone: string;
  status: "in_progress" | "completed";
  startDate: Date;
}

const mockBroadcasts: Broadcast[] = [
  {
    id: "1",
    name: "João Silva",
    phone: "+55 11 99999-9999",
    status: "in_progress",
    startDate: new Date(),
  },
  {
    id: "2",
    name: "Maria Santos",
    phone: "+55 11 88888-8888",
    status: "completed",
    startDate: new Date(),
  },
];

export function BroadcastsTable() {
  const { toast } = useToast();

  const handleStop = (id: string) => {
    toast({
      title: "Disparo interrompido",
      description: "O disparo foi interrompido com sucesso.",
    });
  };

  return (
    <div className="glass-card overflow-hidden rounded-xl border-0">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-primary/20">
            <TableHead className="text-primary">Nome</TableHead>
            <TableHead className="text-primary">Telefone</TableHead>
            <TableHead className="text-primary">Status</TableHead>
            <TableHead className="text-primary">Data de Início</TableHead>
            <TableHead className="text-primary text-right">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockBroadcasts.map((broadcast) => (
            <TableRow key={broadcast.id} className="hover:bg-primary/5">
              <TableCell className="font-medium">{broadcast.name}</TableCell>
              <TableCell>{broadcast.phone}</TableCell>
              <TableCell>
                <Badge 
                  variant={broadcast.status === "completed" ? "default" : "secondary"}
                  className={`${
                    broadcast.status === "completed" 
                      ? "bg-primary/10 text-primary border border-primary/20" 
                      : "bg-yellow-100/10 text-yellow-500 border border-yellow-500/20"
                  }`}
                >
                  {broadcast.status === "completed" ? "Finalizado" : "Em andamento"}
                </Badge>
              </TableCell>
              <TableCell>{format(broadcast.startDate, "dd/MM/yyyy HH:mm")}</TableCell>
              <TableCell className="text-right">
                {broadcast.status === "in_progress" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStop(broadcast.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Parar
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}