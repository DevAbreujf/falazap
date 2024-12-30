import { ArrowUpRight, LucideIcon, TrendingUp } from "lucide-react";
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
      <CardContent>
        <div className="flex flex-col justify-between h-[120px]">
          <div className="text-3xl font-bold mt-2">{value}</div>
          <div>
            <p className="text-sm text-emerald-500 flex items-center gap-1 mb-2">
              <TrendingUp className="h-4 w-4" />
              {trend}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}