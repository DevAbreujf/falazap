import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface TextNodeData {
  label: string;
  content: string;
}

export function TextNode({ data, id }: { data: TextNodeData; id: string }) {
  const { setNodes } = useReactFlow();

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  return (
    <div className="bg-[#1A1A1A] rounded-xl border border-[#333] p-4 min-w-[300px] text-white">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-[40px] !h-[12px] !rounded-[6px] !bg-orange-600 !border-2 !border-orange-700 !top-0 !-translate-y-[30px] !left-1/2 !-translate-x-1/2"
      />
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Mensagem de texto</h3>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-white"
            onClick={handleDelete}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Textarea
          placeholder="Digite sua mensagem..."
          value={data.content}
          className="min-h-[100px] bg-[#333] border-[#444] text-white"
        />
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500"
      />
    </div>
  );
}