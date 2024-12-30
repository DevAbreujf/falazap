import { ArrowUpRight, LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend: string;
  icon: LucideIcon;
  iconColor?: string;
}

export function MetricCard({ title, value, trend, icon: Icon, iconColor = "text-primary" }: MetricCardProps) {
  return (
    <Card className="hover-glow transition-all duration-300 hover:translate-y-[-2px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Icon className={`h-5 w-5 ${iconColor}`} />
          {title}
        </CardTitle>
        <ArrowUpRight className="h-4 w-4 text-emerald-500" />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-sm text-emerald-500 flex items-center gap-1">
          <TrendingUp className="h-4 w-4" />
          {trend}
        </p>
      </CardContent>
    </Card>
  );
}