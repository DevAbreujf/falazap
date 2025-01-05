import { Handle, Position, useReactFlow } from "@xyflow/react";
import { X, ChevronDown, PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Node } from "@xyflow/react";

const predefinedTags = [
  "oferta",
  "fim do funil",
  "link de compra",
  "quebra de objeção"
];

interface TagsNodeData {
  label: string;
  tags: string[];
}

export function TagsNode({ id, data }: { id: string; data: TagsNodeData }) {
  const { setNodes } = useReactFlow();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  const handleSelect = (currentValue: string) => {
    setValue(currentValue);
    setOpen(false);

    setNodes((nodes: Node[]) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              tags: [currentValue],
            },
          };
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
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between bg-[#333] border-[#444] text-white hover:bg-[#444] hover:text-white"
              >
                {value || "Digite sua TAG"}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput 
                  placeholder="Digite sua TAG"
                  value={inputValue}
                  onValueChange={setInputValue}
                />
                <CommandEmpty>
                  {inputValue && (
                    <CommandItem
                      onSelect={() => handleSelect(inputValue)}
                      className="flex items-center gap-2"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Criar "{inputValue}"
                    </CommandItem>
                  )}
                </CommandEmpty>
                <CommandGroup>
                  {predefinedTags.map((tag) => (
                    <CommandItem
                      key={tag}
                      value={tag}
                      onSelect={() => handleSelect(tag)}
                      className={cn(
                        "flex items-center gap-2",
                        value === tag && "bg-accent"
                      )}
                    >
                      {tag}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
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
        type="source"
        position={Position.Right}
        className="!bg-primary !w-3 !h-3 !border-2"
      />
    </div>
  );
}