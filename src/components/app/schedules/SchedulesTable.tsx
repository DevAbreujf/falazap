import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Schedule } from "@/types/schedule";
import { ScheduleActions } from "@/components/app/schedules/ScheduleActions";
import { useIsMobile } from "@/hooks/use-mobile";

interface SchedulesTableProps {
  schedules: Schedule[];
  onEdit: (schedule: Schedule) => void;
  onDelete: (id: string) => void;
}

export function SchedulesTable({ schedules, onEdit, onDelete }: SchedulesTableProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-4">
        {schedules.map((schedule) => (
          <div 
            key={schedule.id} 
            className="glass-card p-4 space-y-3 border-0 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-foreground/90">{schedule.reminderName}</h3>
                <p className="text-sm text-foreground/70">{schedule.clientName}</p>
              </div>
              <ScheduleActions
                schedule={schedule}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
            <div className="text-sm space-y-1 text-foreground/70">
              <p>Data: {format(schedule.date, "dd/MM/yyyy")}</p>
              <p>Horário: {schedule.time}</p>
              <p>Telefone: {schedule.phone}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden border-0 transition-all duration-300 hover:shadow-lg">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-muted/50 border-b border-white/10">
            <TableHead className="text-primary font-medium">Nome do Lembrete</TableHead>
            <TableHead className="text-primary font-medium">Cliente</TableHead>
            <TableHead className="text-primary font-medium">Data</TableHead>
            <TableHead className="text-primary font-medium">Horário</TableHead>
            <TableHead className="text-primary font-medium">Telefone</TableHead>
            <TableHead className="text-primary font-medium text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules.map((schedule) => (
            <TableRow 
              key={schedule.id} 
              className="hover:bg-muted/50 transition-colors duration-200 border-b border-white/5"
            >
              <TableCell className="font-medium text-foreground/90">{schedule.reminderName}</TableCell>
              <TableCell className="text-foreground/80">{schedule.clientName}</TableCell>
              <TableCell className="text-foreground/80">
                {format(schedule.date, "dd/MM/yyyy")}
              </TableCell>
              <TableCell className="text-foreground/80">{schedule.time}</TableCell>
              <TableCell className="text-foreground/80">{schedule.phone}</TableCell>
              <TableCell>
                <ScheduleActions
                  schedule={schedule}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}