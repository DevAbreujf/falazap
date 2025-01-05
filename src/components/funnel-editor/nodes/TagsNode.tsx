import { Handle, Position, useReactFlow } from "@xyflow/react";
import { X, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(data.tags || []);

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  const handleSelect = (currentValue: string) => {
    setValue(currentValue);
    setOpen(false);
    
    if (!selectedTags.includes(currentValue)) {
      const newTags = [...selectedTags, currentValue];
      setSelectedTags(newTags);
      setNodes((nds) =>
        nds.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, tags: newTags } } : node
        )
      );
    }
  };

  const createNewTag = (inputValue: string) => {
    if (inputValue.trim()) {
      handleSelect(inputValue);
    }
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
                {value
                  ? value
                  : "Escolha ou crie uma tag"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 bg-[#1A1A1A] border-[#333]">
              <Command className="bg-transparent">
                <CommandInput 
                  placeholder="Digite o nome da tag" 
                  className="bg-[#333] border-[#444] text-white"
                  value={value}
                  onValueChange={setValue}
                />
                <CommandEmpty className="py-2 px-4 text-sm">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-primary hover:bg-[#333]"
                    onClick={() => createNewTag(value)}
                  >
                    Criar tag "{value}"
                  </Button>
                </CommandEmpty>
                <CommandGroup>
                  {tagOptions.map((tag) => (
                    <CommandItem
                      key={tag}
                      value={tag}
                      onSelect={handleSelect}
                      className="hover:bg-[#333] aria-selected:bg-[#444]"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === tag ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {tag}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
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