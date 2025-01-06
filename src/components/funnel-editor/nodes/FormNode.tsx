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
        className="!w-[40px] !h-[12px] !rounded-[6px] !bg-orange-600 !border-2 !border-orange-700 !top-0 !-translate-y-[30px] !left-1/2 !-translate-x-1/2"
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
        className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500 !left-1/2 !-translate-x-1/2"
      />
    </div>
  );
}