import { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

interface Schedule {
  id: number;
  reminderName: string;
  clientName: string;
  phone: string;
  message: string;
  date: string;
  time: string;
}

export default function Schedules() {
  const { toast } = useToast();
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [newDate, setNewDate] = useState<Date>();
  const [newTime, setNewTime] = useState("");
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    // Load schedules from localStorage
    const savedSchedules = localStorage.getItem("schedules");
    if (savedSchedules) {
      setSchedules(JSON.parse(savedSchedules));
    }
  }, []);

  const handleTimeChange = (scheduleId: number) => {
    if (!newDate || !newTime) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma nova data e horário",
        variant: "destructive",
      });
      return;
    }

    const updatedSchedules = schedules.map(schedule => {
      if (schedule.id === scheduleId) {
        return {
          ...schedule,
          date: format(newDate, "yyyy-MM-dd"),
          time: newTime
        };
      }
      return schedule;
    });

    setSchedules(updatedSchedules);
    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));

    toast({
      title: "Horário alterado",
      description: "O horário foi atualizado com sucesso!",
    });

    setSelectedSchedule(null);
    setNewDate(undefined);
    setNewTime("");
  };

  const handleDelete = (scheduleId: number) => {
    const updatedSchedules = schedules.filter(schedule => schedule.id !== scheduleId);
    setSchedules(updatedSchedules);
    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));

    toast({
      title: "Agendamento removido",
      description: "O agendamento foi removido com sucesso!",
    });
  };

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
                  <TableHead>Nome do Lembrete</TableHead>
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
                    <TableCell className="font-medium">{schedule.reminderName}</TableCell>
                    <TableCell>{schedule.clientName}</TableCell>
                    <TableCell>{schedule.phone}</TableCell>
                    <TableCell>{schedule.message}</TableCell>
                    <TableCell>
                      {format(new Date(`${schedule.date} ${schedule.time}`), "PPp", {
                        locale: ptBR,
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedSchedule(schedule)}
                            >
                              <Clock className="w-4 h-4 mr-1" />
                              Alterar Horário
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Alterar Data e Horário</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>Nova Data</Label>
                                <Calendar
                                  mode="single"
                                  selected={newDate}
                                  onSelect={setNewDate}
                                  initialFocus
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Novo Horário</Label>
                                <Input
                                  type="time"
                                  value={newTime}
                                  onChange={(e) => setNewTime(e.target.value)}
                                />
                              </div>
                              <Button
                                className="w-full"
                                onClick={() => handleTimeChange(schedule.id)}
                              >
                                Confirmar Alteração
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(schedule.id)}
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