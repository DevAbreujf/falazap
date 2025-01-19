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
    <div className="space-y-2 pt-4 relative bg-[#272733] border border-[#434358] rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[15px] text-zinc-100">Condição:</span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onDelete(trigger.id)}
          className="text-zinc-400 hover:text-red-400 hover:bg-transparent"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Select 
        defaultValue={trigger.triggerType}
        onValueChange={(value) => onUpdate(trigger.id, { 
          triggerType: value as Trigger["triggerType"],
          platform: undefined,
          event: undefined,
          triggerTerm: undefined
        })}
      >
        <SelectTrigger className="w-full bg-[#333] border-[#444] text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-[#333] border-[#444]">
          <SelectItem value="contains">Contenha</SelectItem>
          <SelectItem value="exact">Exata</SelectItem>
          <SelectItem value="any">Qualquer mensagem</SelectItem>
          <SelectItem value="integration">Integração</SelectItem>
        </SelectContent>
      </Select>

      {(trigger.triggerType === "contains" || trigger.triggerType === "exact") && (
        <div className="space-y-2 mt-4">
          <span className="text-[15px] text-zinc-100 block">Termo:</span>
          <Input
            placeholder="Ex.: 'Pinterest'"
            value={trigger.triggerTerm}
            onChange={(e) => onUpdate(trigger.id, { 
              triggerTerm: e.target.value 
            })}
            className="bg-[#333] border-[#444] text-white placeholder:text-zinc-500"
          />
        </div>
      )}

      {trigger.triggerType === "integration" && (
        <div className="space-y-2">
          <Select
            value={trigger.platform}
            onValueChange={(value) => onUpdate(trigger.id, { 
              platform: value as "kiwify" | "hotmart" 
            })}
          >
            <SelectTrigger className="bg-[#333] border-[#444] text-white">
              <SelectValue placeholder="Selecione a plataforma" />
            </SelectTrigger>
            <SelectContent className="bg-[#333] border-[#444]">
              <SelectItem value="kiwify">Kiwify</SelectItem>
              <SelectItem value="hotmart">Hotmart</SelectItem>
            </SelectContent>
          </Select>

          {trigger.platform && (
            <Select
              value={trigger.event}
              onValueChange={(value) => onUpdate(trigger.id, { 
                event: value as "abandoned" | "approved" 
              })}
            >
              <SelectTrigger className="bg-[#333] border-[#444] text-white">
                <SelectValue placeholder="Selecione o evento" />
              </SelectTrigger>
              <SelectContent className="bg-[#333] border-[#444]">
                <SelectItem value="abandoned">Carrinho abandonado</SelectItem>
                <SelectItem value="approved">Venda aprovada</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        id={`trigger-${trigger.id}`}
        className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500 !translate-x-[3em]"
        style={{ right: '-3em' }}
      />
    </div>
  );
}