import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Play, Square } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data para exemplo
const mockBroadcasts = [
  {
    id: 1,
    contactName: "João Silva",
    phone: "+5511999999999",
    funnelName: "Funil de Vendas Principal",
    status: "em_andamento",
    startDate: "2024-03-15T10:00:00",
  },
  {
    id: 2,
    contactName: "Maria Santos",
    phone: "+5511988888888",
    funnelName: "Funil de Captação",
    status: "pausado",
    startDate: "2024-03-14T15:30:00",
  },
];

export default function Broadcasts() {
  const [broadcasts, setBroadcasts] = useState(mockBroadcasts);
  const { toast } = useToast();

  const handleStop = (id: number) => {
    setBroadcasts(prevBroadcasts =>
      prevBroadcasts.map(broadcast =>
        broadcast.id === id
          ? { ...broadcast, status: "pausado" }
          : broadcast
      )
    );
    toast({
      title: "Disparo pausado",
      description: "O disparo foi pausado com sucesso.",
    });
  };

  const handleManualStart = (id: number) => {
    setBroadcasts(prevBroadcasts =>
      prevBroadcasts.map(broadcast =>
        broadcast.id === id
          ? { ...broadcast, status: "em_andamento" }
          : broadcast
      )
    );
    toast({
      title: "Disparo iniciado",
      description: "O disparo manual foi iniciado com sucesso.",
    });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          <div className="flex items-center justify-between p-4 lg:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              asChild 
              className="hover:bg-primary/20 bg-black/50"
            >
              <SidebarTrigger>
                <Menu className="h-6 w-6 text-primary" />
              </SidebarTrigger>
            </Button>
          </div>
          <main className="container mx-auto px-8 py-10">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Disparos
                </h1>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-2" />
              </div>
              <p className="text-muted-foreground text-lg">
                Gerencie os disparos automáticos e manuais dos seus funis.
              </p>
            </div>

            <div className="mt-8">
              <div className="glass-card overflow-hidden rounded-xl">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-b border-primary/20">
                      <TableHead className="text-primary">Nome</TableHead>
                      <TableHead className="text-primary">Telefone</TableHead>
                      <TableHead className="text-primary">Funil</TableHead>
                      <TableHead className="text-primary">Status</TableHead>
                      <TableHead className="text-primary">Data Início</TableHead>
                      <TableHead className="text-primary">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {broadcasts.map((broadcast) => (
                      <TableRow key={broadcast.id} className="hover:bg-primary/5 transition-colors">
                        <TableCell className="font-medium">{broadcast.contactName}</TableCell>
                        <TableCell>{broadcast.phone}</TableCell>
                        <TableCell>{broadcast.funnelName}</TableCell>
                        <TableCell>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                                  broadcast.status === "em_andamento" 
                                    ? "bg-primary/10 text-primary border border-primary/20" 
                                    : "bg-yellow-100/10 text-yellow-500 border border-yellow-500/20"
                                }`}>
                                  {broadcast.status === "em_andamento" ? "Em andamento" : "Pausado"}
                                </span>
                              </TooltipTrigger>
                              {broadcast.status === "em_andamento" && (
                                <TooltipContent>
                                  <p>Funil em execução: {broadcast.funnelName}</p>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell>
                          {new Date(broadcast.startDate).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {broadcast.status === "em_andamento" ? (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleStop(broadcast.id)}
                              className="hover:bg-destructive/90"
                            >
                              <Square className="w-4 h-4 mr-2" />
                              Parar
                            </Button>
                          ) : (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleManualStart(broadcast.id)}
                              className="hover:bg-primary/90"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Disparo Manual
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
