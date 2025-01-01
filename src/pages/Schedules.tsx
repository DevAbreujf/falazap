import { useState } from "react";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { Schedule } from "@/types/schedule";
import { useSchedules } from "@/hooks/use-schedules";
import { SchedulesHeader } from "@/components/app/schedules/SchedulesHeader";
import { SchedulesFilters } from "@/components/app/schedules/SchedulesFilters";
import { SchedulesTable } from "@/components/app/schedules/SchedulesTable";

export default function Schedules() {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [newDate, setNewDate] = useState<Date>();
  const [newTime, setNewTime] = useState("");
  
  const { schedules, updateSchedule, deleteSchedule } = useSchedules();
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    deleteSchedule(id);
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

    updateSchedule(editingSchedule.id, {
      date: newDate,
      time: newTime
    });

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
          <SchedulesHeader />

          <div className="glass-card p-6 space-y-6">
            <SchedulesFilters
              search={search}
              setSearch={setSearch}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />

            <SchedulesTable
              schedules={filteredSchedules}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
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