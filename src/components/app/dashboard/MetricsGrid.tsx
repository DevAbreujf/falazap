import { MessageSquare, Users, Target } from "lucide-react";
import { MetricCard } from "@/components/app/MetricCard";

type TimeRange = "day" | "week" | "month";

interface MetricsData {
  messages: {
    value: string;
    trend: string;
  };
  leads: {
    value: string;
    trend: string;
  };
  conversion: {
    value: string;
    trend: string;
  };
  funnels: {
    value: string;
    trend: string;
  };
}

const metricsData: Record<TimeRange, MetricsData> = {
  day: {
    messages: {
      value: "345",
      trend: "+15.2% em relação ao período anterior"
    },
    leads: {
      value: "45",
      trend: "+8.5% em relação ao período anterior"
    },
    conversion: {
      value: "13.1%",
      trend: "+1.8% em relação ao período anterior"
    },
    funnels: {
      value: "3",
      trend: "Sem alteração em relação ao período anterior"
    }
  },
  week: {
    messages: {
      value: "2,345",
      trend: "+20.1% em relação ao período anterior"
    },
    leads: {
      value: "345",
      trend: "+10.5% em relação ao período anterior"
    },
    conversion: {
      value: "14.2%",
      trend: "+2.3% em relação ao período anterior"
    },
    funnels: {
      value: "3",
      trend: "+1 em relação ao período anterior"
    }
  },
  month: {
    messages: {
      value: "8,976",
      trend: "+25.3% em relação ao período anterior"
    },
    leads: {
      value: "1,234",
      trend: "+12.7% em relação ao período anterior"
    },
    conversion: {
      value: "15.8%",
      trend: "+3.1% em relação ao período anterior"
    },
    funnels: {
      value: "4",
      trend: "+2 em relação ao período anterior"
    }
  }
};

interface MetricsGridProps {
  timeRange: TimeRange;
}

export function MetricsGrid({ timeRange }: MetricsGridProps) {
  const currentMetrics = metricsData[timeRange];

  return (
    <div className="grid gap-6 md:grid-cols-4">
      <MetricCard
        title="Mensagens Enviadas"
        value={currentMetrics.messages.value}
        trend={currentMetrics.messages.trend}
        icon={MessageSquare}
      />
      <MetricCard
        title="Novos Leads"
        value={currentMetrics.leads.value}
        trend={currentMetrics.leads.trend}
        icon={Users}
      />
      <MetricCard
        title="Taxa de Conversão"
        value={currentMetrics.conversion.value}
        trend={currentMetrics.conversion.trend}
        icon={Target}
      />
      <MetricCard
        title="Funis Ativos"
        value={currentMetrics.funnels.value}
        trend={currentMetrics.funnels.trend}
        icon={Target}
      />
    </div>
  );
}