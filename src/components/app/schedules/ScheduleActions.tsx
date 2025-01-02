import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Schedule } from "@/types/schedule";
import { useIsMobile } from "@/hooks/use-mobile";

interface ScheduleActionsProps {
  schedule: Schedule;
  onEdit: (schedule: Schedule) => void;
  onDelete: (id: string) => void;
}

export function ScheduleActions({ schedule, onEdit, onDelete }: ScheduleActionsProps) {
  const isMobile = useIsMobile();

  return (
    <div className={`flex gap-2 ${isMobile ? 'flex-col sm:flex-row' : 'justify-end'}`}>
      <Button
        variant="outline"
        size={isMobile ? "sm" : "default"}
        className={isMobile ? "w-full sm:w-auto" : ""}
        onClick={() => onEdit(schedule)}
      >
        Alterar horário
      </Button>
      <Button
        variant="outline"
        size={isMobile ? "sm" : "icon"}
        className={isMobile ? "w-full sm:w-auto" : ""}
        onClick={() => onDelete(schedule.id)}
      >
        {isMobile ? (
          <span className="flex items-center justify-center gap-2">
            <Trash2 className="h-4 w-4" />
            Excluir
          </span>
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}