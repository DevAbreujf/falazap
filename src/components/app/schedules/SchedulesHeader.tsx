import { Button } from "@/components/ui/button";

export function SchedulesHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient-primary leading-relaxed">
          Lista de Agendamentos
        </h1>
        <p className="text-muted-foreground">
          Gerencie todos os seus agendamentos em um só lugar
        </p>
      </div>
      <Button onClick={() => window.location.href = "/reminders"} className="w-full md:w-auto">
        Novo Agendamento
      </Button>
    </div>
  );
}