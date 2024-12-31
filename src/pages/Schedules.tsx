import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, Trash } from "lucide-react";

export default function Schedules() {
  // Temporary mock data - replace with real data later
  const schedules = [
    {
      id: 1,
      clientName: "João Silva",
      phone: "(11) 99999-9999",
      message: "Consulta agendada",
      date: "2024-04-20 14:30",
    },
    {
      id: 2,
      clientName: "Maria Santos",
      phone: "(11) 98888-8888",
      message: "Retorno marcado",
      date: "2024-04-21 15:00",
    },
  ];

  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gradient-primary mb-8">
            Agendamentos
          </h1>

          <div className="glass-card p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Mensagem</TableHead>
                  <TableHead>Data e Hora</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell>{schedule.clientName}</TableCell>
                    <TableCell>{schedule.phone}</TableCell>
                    <TableCell>{schedule.message}</TableCell>
                    <TableCell>{schedule.date}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => console.log("Change time", schedule.id)}
                        >
                          <Clock className="w-4 h-4 mr-1" />
                          Alterar Horário
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => console.log("Delete", schedule.id)}
                        >
                          <Trash className="w-4 h-4 mr-1" />
                          Apagar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}