import { Handle, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function StartNode({ data }: { data: { label: string; triggers: any[]; delay: { value: number; unit: string } } }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border min-w-[300px]">
      <div className="space-y-4">
        <h3 className="font-medium">{data.label}</h3>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Tempo de espera</label>
          <div className="flex gap-2">
            <Input 
              type="number" 
              value={data.delay.value}
              min={0}
              className="w-20"
            />
            <Select value={data.delay.unit}>
              <option value="minutes">Minutos</option>
              <option value="hours">Horas</option>
              <option value="days">Dias</option>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Gatilhos</label>
            <Button variant="outline" size="sm">
              Adicionar Gatilho
            </Button>
          </div>
          
          {data.triggers.map((trigger, index) => (
            <div key={index} className="p-2 border rounded-lg">
              {/* Trigger content */}
            </div>
          ))}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
}