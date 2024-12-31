import { useState } from "react";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Edit2, Trash2, Search, Calendar as CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Schedule {
  id: string;
  reminderName: string;
  clientName: string;
  date: Date;
  time: string;
  phone: string;
}

export default function Schedules() {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [newDate, setNewDate] = useState<Date>();
  const [newTime, setNewTime] = useState("");
  const { toast } = useToast();

  // Mock data - replace with actual data storage later
  const schedules: Schedule[] = [
    {
      id: "1",
      reminderName: "Consulta Médica",
      clientName: "João Silva",
      date: new Date(2024, 3, 15),
      time: "14:30",
      phone: "(11) 99999-9999"
    },
    // Add more mock data as needed
  ];

  const handleDelete = (id: string) => {
    toast({
      title: "Agendamento removido",
      description: "O agendamento foi removido com sucesso!"
    });
  };

  const handleEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setNewDate(schedule.date);
    setNewTime(schedule.time);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingSchedule || !newDate || !newTime) return;

    // Here you would update the schedule in your backend
    toast({
      title: "Agendamento atualizado",
      description: "O horário foi alterado com sucesso!"
    });
    setIsEditDialogOpen(false);
  };

  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = 
      schedule.reminderName.toLowerCase().includes(search.toLowerCase()) ||
      schedule.clientName.toLowerCase().includes(search.toLowerCase()) ||
      schedule.phone.includes(search);
    
    const matchesDate = !selectedDate || 
      format(schedule.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');

    return matchesSearch && matchesDate;
  });

  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gradient-primary">
              Agendamentos
            </h1>
            <Button onClick={() => window.location.href = "/reminders"}>
              Novo Agendamento
            </Button>
          </div>

          <div className="glass-card p-6 space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar por nome, cliente ou telefone..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP", { locale: ptBR })
                    ) : (
                      "Filtrar por data"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
              {selectedDate && (
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedDate(undefined)}
                  className="w-full md:w-auto"
                >
                  Limpar filtro
                </Button>
              )}
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome do Lembrete</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSchedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell>{schedule.reminderName}</TableCell>
                      <TableCell>{schedule.clientName}</TableCell>
                      <TableCell>
                        {format(schedule.date, "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>{schedule.time}</TableCell>
                      <TableCell>{schedule.phone}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(schedule)}
                          >
                            <span className="sr-only">Alterar horário</span>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(schedule.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alterar Horário</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Data</label>
              <Calendar
                mode="single"
                selected={newDate}
                onSelect={setNewDate}
                locale={ptBR}
                className="rounded-md border"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Horário</label>
              <Input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit}>
              Salvar alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}