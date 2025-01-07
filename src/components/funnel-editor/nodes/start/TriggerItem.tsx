import { Handle, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Trigger } from "@/types/flow";

interface TriggerItemProps {
  trigger: Trigger;
  index: number;
  onUpdate: (triggerId: string, updates: Partial<Trigger>) => void;
  onDelete: (triggerId: string) => void;
}

export function TriggerItem({ trigger, index, onUpdate, onDelete }: TriggerItemProps) {
  return (
    <div className="space-y-2 p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1">
          <p className="text-xs text-zinc-400 mb-2">Condição:</p>
          <Select 
            defaultValue={trigger.triggerType}
            onValueChange={(value) => onUpdate(trigger.id, { 
              triggerType: value as Trigger["triggerType"],
              platform: undefined,
              event: undefined,
              triggerTerm: undefined
            })}
          >
            <SelectTrigger className="w-full bg-[#1f1f2a] border-[#434358] text-zinc-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1f1f2a] border-[#434358]">
              <SelectItem value="contains">Contenha</SelectItem>
              <SelectItem value="exact">Exata</SelectItem>
              <SelectItem value="any">Qualquer mensagem</SelectItem>
              <SelectItem value="integration">Integração</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onDelete(trigger.id)}
          className="text-zinc-400 hover:text-zinc-300"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {(trigger.triggerType === "contains" || trigger.triggerType === "exact") && (
        <div>
          <p className="text-xs text-zinc-400 mb-2">Termo:</p>
          <Input
            placeholder="Ex.: Pinterest"
            value={trigger.triggerTerm}
            onChange={(e) => onUpdate(trigger.id, { 
              triggerTerm: e.target.value 
            })}
            className="bg-[#1f1f2a] border-[#434358] text-zinc-100 placeholder-zinc-500"
          />
        </div>
      )}

      {trigger.triggerType === "integration" && (
        <div className="space-y-3">
          <div>
            <p className="text-xs text-zinc-400 mb-2">Plataforma:</p>
            <Select
              value={trigger.platform}
              onValueChange={(value) => onUpdate(trigger.id, { 
                platform: value as "kiwify" | "hotmart" 
              })}
            >
              <SelectTrigger className="w-full bg-[#1f1f2a] border-[#434358] text-zinc-100">
                <SelectValue placeholder="Selecione a plataforma" />
              </SelectTrigger>
              <SelectContent className="bg-[#1f1f2a] border-[#434358]">
                <SelectItem value="kiwify">Kiwify</SelectItem>
                <SelectItem value="hotmart">Hotmart</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {trigger.platform && (
            <div>
              <p className="text-xs text-zinc-400 mb-2">Evento:</p>
              <Select
                value={trigger.event}
                onValueChange={(value) => onUpdate(trigger.id, { 
                  event: value as "abandoned" | "approved" 
                })}
              >
                <SelectTrigger className="w-full bg-[#1f1f2a] border-[#434358] text-zinc-100">
                  <SelectValue placeholder="Selecione o evento" />
                </SelectTrigger>
                <SelectContent className="bg-[#1f1f2a] border-[#434358]">
                  <SelectItem value="abandoned">Carrinho abandonado</SelectItem>
                  <SelectItem value="approved">Venda aprovada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        id={`trigger-${trigger.id}`}
        className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500 !translate-x-[4em]"
        style={{ right: '-4em' }}
      />
    </div>
  );
}