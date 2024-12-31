import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Schedule } from "@/types/schedule";

interface ScheduleActionsProps {
  schedule: Schedule;
  onEdit: (schedule: Schedule) => void;
  onDelete: (id: string) => void;
}

export function ScheduleActions({ schedule, onEdit, onDelete }: ScheduleActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        onClick={() => onEdit(schedule)}
      >
        Alterar horário
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onDelete(schedule.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}