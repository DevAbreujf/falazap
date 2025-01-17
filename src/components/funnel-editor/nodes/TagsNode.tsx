import { Handle, Position, useReactFlow } from "@xyflow/react";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Node } from "@xyflow/react";

interface TagsNodeData {
  label: string;
  tags: string[];
}

export function TagsNode({ id, data }: { id: string; data: TagsNodeData }) {
  const { setNodes } = useReactFlow();
  const [tagValue, setTagValue] = useState("");

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  const handleTagInput = (e: React.FocusEvent<HTMLInputElement>) => {
    const newTag = e.target.value.trim();
    if (newTag) {
      setNodes((nodes: Node[]) =>
        nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                tags: [newTag],
              },
            };
          }
          return node;
        })
      );
    }
  };

  return (
    <div className="bg-[#1A1A1A] rounded-xl border border-[#333] p-4 min-w-[300px] text-white" style={{ overflow: 'visible', position: 'relative' }}>
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
          <Input
            value={tagValue}
            onChange={(e) => setTagValue(e.target.value)}
            onBlur={handleTagInput}
            placeholder="Digite sua TAG"
            className="bg-[#333] border-[#444] text-white"
          />
        </div>
        
        {data.tags && data.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag, index) => (
              <div key={index} className="bg-primary/20 px-2 py-1 rounded text-sm">
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="!w-[40px] !h-[12px] !rounded-[6px] !bg-orange-600 !border-2 !border-orange-700 !top-0 !-translate-y-[30px] !left-1/2 !-translate-x-1/2"
      />

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500 !translate-x-[4.5em]"
      />
    </div>
  );
}