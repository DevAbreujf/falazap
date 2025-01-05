import { Handle, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, X, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ForwardingRule {
  id: string;
  condition: "exact" | "contains";
  term: string;
  action: string;
}

interface ForwardingNodeData {
  label: string;
  rules?: ForwardingRule[];
}

export function ForwardingNode({ data }: { data: ForwardingNodeData }) {
  const [rules, setRules] = useState<ForwardingRule[]>(data.rules || []);
  const [actions, setActions] = useState<string[]>([
    "Enviar para equipe A",
    "Enviar para equipe B",
    "Enviar para equipe C"
  ]);
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});

  const addRule = () => {
    const newRule: ForwardingRule = {
      id: `rule-${rules.length + 1}`,
      condition: "exact",
      term: "",
      action: "",
    };
    setRules([...rules, newRule]);
  };

  const removeRule = (ruleId: string) => {
    setRules(rules.filter((rule) => rule.id !== ruleId));
  };

  const updateRule = (ruleId: string, updates: Partial<ForwardingRule>) => {
    setRules(
      rules.map((rule) =>
        rule.id === ruleId ? { ...rule, ...updates } : rule
      )
    );
  };

  const handleActionSelect = (ruleId: string, value: string) => {
    if (!actions.includes(value)) {
      setActions([...actions, value]);
    }
    updateRule(ruleId, { action: value });
    setOpen({ ...open, [ruleId]: false });
  };

  const handleCreateTeam = (ruleId: string) => {
    const teamName = prompt("Digite o nome da equipe ou setor:");
    if (teamName) {
      const newAction = `Enviar para ${teamName}`;
      handleActionSelect(ruleId, newAction);
    }
  };

  return (
    <div className="bg-white rounded-xl border p-4 min-w-[300px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-primary !w-3 !h-3 !border-2"
      />
      
      <div className="space-y-4">
        <h3 className="font-medium">Encaminhamento</h3>

        {rules.map((rule, index) => (
          <div key={rule.id} className="space-y-2 border-t pt-4 relative">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => removeRule(rule.id)}
              className="absolute right-0 top-4 text-destructive hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="space-y-2">
              <label className="text-sm font-medium">Regra</label>
              <Select
                value={rule.condition}
                onValueChange={(value) => 
                  updateRule(rule.id, { 
                    condition: value as "exact" | "contains" 
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exact">Exata</SelectItem>
                  <SelectItem value="contains">Contenha</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder={rule.condition === "exact" ? "Mensagem exata" : "Contenha na mensagem"}
                value={rule.term}
                onChange={(e) => updateRule(rule.id, { term: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Ação</label>
              <Popover 
                open={open[rule.id]} 
                onOpenChange={(isOpen) => setOpen({ ...open, [rule.id]: isOpen })}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open[rule.id]}
                    className="w-full justify-between"
                  >
                    {rule.action || "Selecione uma ação..."}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Buscar ação..." />
                    <CommandEmpty>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start px-2 py-1.5"
                        onClick={() => handleCreateTeam(rule.id)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Criar equipe
                      </Button>
                    </CommandEmpty>
                    <CommandGroup>
                      {actions.map((action) => (
                        <CommandItem
                          key={action}
                          value={action}
                          onSelect={() => handleActionSelect(rule.id, action)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              rule.action === action ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {action}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <Handle
              type="source"
              position={Position.Right}
              id={`rule-${index}`}
              className="!bg-primary !w-3 !h-3 !border-2"
            />
          </div>
        ))}

        <div className="flex justify-center pt-2">
          <Button onClick={addRule} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Encaminhamento
          </Button>
        </div>
      </div>
    </div>
  );
}