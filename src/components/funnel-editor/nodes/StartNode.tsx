import { Handle, Position } from "@xyflow/react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type DelayUnit = "seconds" | "minutes" | "hours";

interface StartNodeData {
  label: string;
  triggers: string[];
  delay: {
    value: number;
    unit: DelayUnit;
  };
}

export function StartNode({ data }: { data: StartNodeData }) {
  return (
    <div className="bg-[#1A1A1A] rounded-xl border border-[#333] p-4 min-w-[300px] text-white">
      <div className="flex items-center gap-3 mb-4">
        <div className="rounded-md bg-primary/10 p-2">
          <Clock className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-medium">Início do Funil</h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Atraso inicial</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              min={0}
              defaultValue={data.delay.value}
              className="bg-[#333] border-[#444] text-white"
            />
            <Select defaultValue={data.delay.unit}>
              <SelectTrigger className="w-[110px] bg-[#333] border-[#444] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seconds">Segundos</SelectItem>
                <SelectItem value="minutes">Minutos</SelectItem>
                <SelectItem value="hours">Horas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="!bg-primary !w-3 !h-3 !border-2" />
    </div>
  );
}