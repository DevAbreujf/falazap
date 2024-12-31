import { Handle, Position } from "@xyflow/react";
import { Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function StartNode() {
  return (
    <div className="glass-card w-[320px] p-4">
      <div className="flex items-center gap-2 text-yellow-500">
        <Flag className="h-4 w-4" />
        <span className="font-medium">Início</span>
      </div>

      <div className="mt-4 space-y-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">
            Define tempo mínimo para o funil ser disparado novamente
          </label>
          <div className="flex gap-2">
            <Input type="number" className="w-20" defaultValue={0} />
            <Select defaultValue="minutes">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minutes">Minutos</SelectItem>
                <SelectItem value="hours">Horas</SelectItem>
                <SelectItem value="days">Dias</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button variant="secondary" className="w-full">
          + Adicionar gatilho
        </Button>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-yellow-500 !border-background"
      />
    </div>
  );
}