import { Button } from "@/components/ui/button";
import { CalendarCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ReminderHeader() {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gradient-primary">
        Lembretes
      </h1>
      <Button
        onClick={() => navigate("/schedules")}
        variant="outline"
        className="flex items-center gap-2"
      >
        <CalendarCheck className="w-4 h-4" />
        Agendamentos
      </Button>
    </div>
  );
}