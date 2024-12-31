import { MessageSquare, Users, Target } from "lucide-react";
import { MetricCard } from "@/components/app/MetricCard";

export function MetricsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-4">
      <MetricCard
        title="Mensagens Enviadas"
        value="2,345"
        trend="+20.1% em relação ao período anterior"
        icon={MessageSquare}
      />
      <MetricCard
        title="Novos Leads"
        value="345"
        trend="+10.5% em relação ao período anterior"
        icon={Users}
      />
      <MetricCard
        title="Taxa de Conversão"
        value="14.2%"
        trend="+2.3% em relação ao período anterior"
        icon={Target}
      />
      <MetricCard
        title="Funis Ativos"
        value="3"
        trend="+1 em relação ao período anterior"
        icon={Target}
      />
    </div>
  );
}