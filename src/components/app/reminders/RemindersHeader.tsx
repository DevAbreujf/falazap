import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";

export function RemindersHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-gradient-primary leading-normal py-1">Agendamentos</h1>
      <Button
        onClick={() => navigate("/schedules")}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Calendar className="w-4 h-4" />
        Lista de Agendamentos
      </Button>
    </div>
  );
}