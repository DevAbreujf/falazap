import { Button } from "@/components/ui/button";

export function SchedulesHeader() {
  return (
    <div className="flex items-center justify-between mb-12">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold text-gradient-primary leading-relaxed">
          Lista de Agendamentos
        </h1>
        <p className="text-muted-foreground">
          Gerencie todos os seus agendamentos em um só lugar
        </p>
      </div>
      <Button onClick={() => window.location.href = "/reminders"}>
        Novo Agendamento
      </Button>
    </div>
  );
}