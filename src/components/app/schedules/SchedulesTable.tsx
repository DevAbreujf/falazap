import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Schedule } from "@/types/schedule";
import { ScheduleActions } from "@/components/app/schedules/ScheduleActions";

interface SchedulesTableProps {
  schedules: Schedule[];
  onEdit: (schedule: Schedule) => void;
  onDelete: (id: string) => void;
}

export function SchedulesTable({ schedules, onEdit, onDelete }: SchedulesTableProps) {
  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-muted/50">
            <TableHead>Nome do Lembrete</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Horário</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules.map((schedule) => (
            <TableRow key={schedule.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{schedule.reminderName}</TableCell>
              <TableCell>{schedule.clientName}</TableCell>
              <TableCell>
                {format(schedule.date, "dd/MM/yyyy")}
              </TableCell>
              <TableCell>{schedule.time}</TableCell>
              <TableCell>{schedule.phone}</TableCell>
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