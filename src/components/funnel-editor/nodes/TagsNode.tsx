import { Handle, Position, useReactFlow } from "@xyflow/react";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface TagsNodeData {
  label: string;
  tags: string[];
}

const tagOptions = [
  "Informações",
  "Oferta",
  "Quebra de Objeções",
  "Link de Compra",
  "Fim do Funil",
];

export function TagsNode({ id, data }: { id: string; data: TagsNodeData }) {
  const { setNodes } = useReactFlow();

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  return (
    <div className="bg-[#1A1A1A] rounded-xl border border-[#333] p-4 min-w-[300px] text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Tags</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-white"
          onClick={handleDelete}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Tag</Label>
          <Select>
            <SelectTrigger className="w-full bg-[#333] border-[#444] text-white">
              <SelectValue placeholder="Escolha ou crie uma tag" />
            </SelectTrigger>
            <SelectContent>
              {tagOptions.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-primary !w-3 !h-3 !border-2"
      />
    </div>
  );
}