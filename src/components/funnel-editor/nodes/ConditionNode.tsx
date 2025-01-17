import { Handle, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus, GitBranch } from "lucide-react";

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
    <div className="bg-[#1f1f2a] rounded-2xl w-[300px] shadow-lg shadow-black/20">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-[40px] !h-[12px] !rounded-[6px] !bg-orange-600 !border-2 !border-orange-700 !top-0 !-translate-y-[30px] !left-1/2 !-translate-x-1/2"
      />
      
      <div className="bg-[#1f1f2a] px-4 py-2 flex items-center justify-between border-b border-[#434358]/50">
        <div className="flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-orange-500" />
          <h3 className="text-sm font-medium text-zinc-100">Condição</h3>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-[#272733] hover:bg-[#323244] text-white border-[#434358]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Condição
          </Button>
        </div>

        {data.conditions.map((condition) => (
          <div key={condition.id} className="space-y-2 border-t border-[#434358] pt-4">
            <Input
              placeholder="Nome da variável"
              value={condition.variable}
              className="bg-[#272733] border-[#434358] text-white"
            />
            
            <Select defaultValue={condition.operator}>
              <SelectTrigger className="bg-[#272733] border-[#434358] text-white">
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
              className="bg-[#272733] border-[#434358] text-white"
            />
          </div>
        ))}
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500"
        id="true"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500"
        id="false"
        style={{ left: "70%" }}
      />
    </div>
  );
}