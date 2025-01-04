import { Handle, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface Condition {
  id: string;
  variable: string;
  operator: "equals" | "contains" | "greater" | "less";
  value: string;
}

interface ConditionNodeData {
  label: string;
  conditions: Condition[];
}

export function ConditionNode({ data }: { data: ConditionNodeData }) {
  return (
    <div className="bg-white rounded-xl border p-4 min-w-[300px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-primary !w-3 !h-3 !border-2"
      />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{data.label}</h3>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Condição
          </Button>
        </div>

        {data.conditions.map((condition) => (
          <div key={condition.id} className="space-y-2 border-t pt-4">
            <Input
              placeholder="Nome da variável"
              value={condition.variable}
            />
            
            <Select defaultValue={condition.operator}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equals">Igual a</SelectItem>
                <SelectItem value="contains">Contém</SelectItem>
                <SelectItem value="greater">Maior que</SelectItem>
                <SelectItem value="less">Menor que</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Valor"
              value={condition.value}
            />
          </div>
        ))}
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-primary !w-3 !h-3 !border-2"
        id="true"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-primary !w-3 !h-3 !border-2"
        id="false"
        style={{ left: "70%" }}
      />
    </div>
  );
}