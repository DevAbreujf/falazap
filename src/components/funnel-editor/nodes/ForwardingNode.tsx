import { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, X, Check } from "lucide-react";
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

export function ForwardingNode({ data, id }: { data: ForwardingNodeData; id: string }) {
  const [rules, setRules] = useState<ForwardingRule[]>(data.rules || []);
  const actions = [
    "Enviar para equipe A",
    "Enviar para equipe B",
    "Enviar para equipe C"
  ];
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
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm w-[300px] relative">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-zinc-300 left-1/2 -translate-x-1/2"
      />
      
      <div className="px-4 py-2 flex items-center justify-between border-b border-zinc-200">
        <h3 className="text-sm font-medium text-zinc-900">Encaminhamento</h3>
      </div>
      
      <div className="p-4">
        {rules.map((rule) => (
          <div key={rule.id} className="space-y-2 border-t border-zinc-200 pt-4 relative">
            <div className="flex justify-between items-center">
              <label className="text-sm text-zinc-600">Regra</label>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => removeRule(rule.id)}
                className="text-zinc-400 hover:text-zinc-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Select
                value={rule.condition}
                onValueChange={(value) => 
                  updateRule(rule.id, { 
                    condition: value as "exact" | "contains" 
                  })
                }
              >
                <SelectTrigger className="bg-white border-zinc-200">
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
                className="bg-white border-zinc-200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-600">Ação</label>
              <Popover 
                open={open[rule.id]} 
                onOpenChange={(isOpen) => setOpen({ ...open, [rule.id]: isOpen })}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open[rule.id]}
                    className="w-full justify-between bg-white border-zinc-200"
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

              <Handle
                type="source"
                position={Position.Right}
                id={`forwarding-${rule.id}`}
                className="w-3 h-3 !bg-zinc-300"
                style={{ transform: 'translateX(2em)' }}
              />
            </div>
          </div>
        ))}

        <div className="flex justify-center pt-2">
          <Button 
            onClick={addRule} 
            variant="outline"
            className="w-full bg-white border-zinc-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Encaminhamento
          </Button>
        </div>
      </div>
    </div>
  );
}
