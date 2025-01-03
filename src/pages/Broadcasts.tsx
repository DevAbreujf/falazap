import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const broadcasts = [
  {
    id: 1,
    name: "João Silva",
    phone: "(11) 99999-9999",
    status: "em andamento",
    startDate: "2024-03-20 14:30",
  },
  {
    id: 2,
    name: "Maria Santos",
    phone: "(11) 88888-8888",
    status: "finalizado",
    startDate: "2024-03-19 10:15",
  },
];

export default function Broadcasts() {
  const handleStopBroadcast = (id: number) => {
    console.log(`Parando broadcast ${id}`);
    // Aqui você implementaria a lógica para parar o broadcast
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          <div className="flex items-center justify-between p-4 lg:hidden">
            <h1 className="text-3xl font-bold text-gradient-primary absolute left-1/2 transform -translate-x-1/2">
              Disparos
            </h1>
            <Button 
              variant="ghost" 
              size="icon" 
              asChild 
              className="hover:bg-primary/20 bg-black/50 ml-auto"
            >
              <SidebarTrigger>
                <Menu className="h-6 w-6 text-primary" />
              </SidebarTrigger>
            </Button>
          </div>
          
          <main className="container mx-auto px-4 py-8">
            <div className="hidden lg:block mb-8">
              <h1 className="text-4xl font-bold text-gradient-primary">
                Disparos
              </h1>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-2" />
            </div>

            <div className="glass-card overflow-hidden border-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-muted/50 border-b border-white/10">
                    <TableHead className="text-primary font-medium">Nome</TableHead>
                    <TableHead className="text-primary font-medium">Telefone</TableHead>
                    <TableHead className="text-primary font-medium">Status</TableHead>
                    <TableHead className="text-primary font-medium">Data de Início</TableHead>
                    <TableHead className="text-primary font-medium text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {broadcasts.map((broadcast) => (
                    <TableRow 
                      key={broadcast.id}
                      className="hover:bg-muted/50 transition-colors duration-200 border-b border-white/5"
                    >
                      <TableCell className="font-medium">{broadcast.name}</TableCell>
                      <TableCell>{broadcast.phone}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          broadcast.status === 'em andamento' 
                            ? 'bg-primary/20 text-primary' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {broadcast.status}
                        </span>
                      </TableCell>
                      <TableCell>{broadcast.startDate}</TableCell>
                      <TableCell className="text-right">
                        {broadcast.status === 'em andamento' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStopBroadcast(broadcast.id)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            Parar
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}