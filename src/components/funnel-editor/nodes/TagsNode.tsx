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
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm w-[300px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-zinc-300 !-top-3"
        style={{ top: "-20px !important" }}
      />

      <div className="px-4 py-2 flex items-center justify-between border-b border-zinc-200">
        <h3 className="text-sm font-medium text-zinc-900">Tags</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-zinc-400 hover:text-zinc-500"
          onClick={handleDelete}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <Label className="text-zinc-700">Tag</Label>
          <Input
            value={tagValue}
            onChange={(e) => setTagValue(e.target.value)}
            onBlur={handleTagInput}
            placeholder="Digite sua TAG"
            className="bg-white border-zinc-200"
          />
        </div>
        
        {data.tags && data.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag, index) => (
              <div key={index} className="bg-primary/20 px-2 py-1 rounded text-sm text-primary">
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-zinc-300"
      />
    </div>
  );
}
