import { Handle, Position, useReactFlow } from "@xyflow/react";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Node } from "@xyflow/react";

interface TagsNodeData {
  label: string;
  tags: string[];
  [key: string]: unknown;
}

const tagOptions = [
  "Informações",
  "Oferta",
  "Quebra de Objeções",
  "Link de Compra",
  "Fim do Funil",
];

export function TagsNode({ id, data }: { id: string; data: TagsNodeData }) {
  const { setNodes } = useReactFlow<Node<TagsNodeData>>();

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  const handleTagSelect = (value: string) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          const currentTags = node.data.tags || [];
          if (!currentTags.includes(value)) {
            return {
              ...node,
              data: {
                ...node.data,
                tags: [...currentTags, value],
              },
            };
          }
        }
        return node;
      })
    );
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
          <Command className="bg-[#333] border-[#444] text-white rounded-lg">
            <CommandInput 
              placeholder="Escolha ou crie uma tag" 
              className="text-white"
            />
            <CommandEmpty>Nenhuma tag encontrada.</CommandEmpty>
            <CommandGroup>
              {tagOptions.map((tag) => (
                <CommandItem
                  key={tag}
                  value={tag}
                  onSelect={handleTagSelect}
                  className="text-white hover:bg-[#444] cursor-pointer"
                >
                  {tag}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </div>

        {data.tags && data.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag, index) => (
              <div
                key={index}
                className="bg-primary/20 text-primary px-2 py-1 rounded-md text-sm"
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-primary !w-3 !h-3 !border-2"
      />
    </div>
  );
}