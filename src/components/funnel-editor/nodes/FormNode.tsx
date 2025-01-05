import { Handle, Position } from "@xyflow/react";
import { Switch } from "@/components/ui/switch";

interface Field {
  id: string;
  type: "name" | "email" | "phone";
  required: boolean;
}

interface FormNodeData {
  label: string;
  fields: Field[];
}

export function FormNode({ data }: { data: FormNodeData }) {
  return (
    <div className="bg-[#1A1A1A] rounded-xl border border-[#333] p-4 min-w-[300px] text-white">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-primary !w-3 !h-3 !border-2"
      />
      
      <div className="space-y-4">
        <h3 className="font-medium">{data.label}</h3>
        
        {data.fields.map((field) => (
          <div key={field.id} className="flex items-center justify-between py-2 border-t border-[#333]">
            <div>
              <p className="font-medium capitalize">{field.type}</p>
              <p className="text-sm text-muted-foreground">
                {field.required ? "Obrigatório" : "Opcional"}
              </p>
            </div>
            <Switch checked={field.required} />
          </div>
        ))}
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-primary !w-3 !h-3 !border-2"
      />
    </div>
  );
}