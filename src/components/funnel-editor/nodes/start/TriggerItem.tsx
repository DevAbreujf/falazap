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
    <div className="space-y-2 pt-4 relative bg-[#272733] border border-[#434358] rounded-lg p-4 mt-4">
      <div className="flex items-center justify-between mb-2">
        <Select 
          defaultValue={trigger.triggerType}
          onValueChange={(value) => onUpdate(trigger.id, { 
            triggerType: value as Trigger["triggerType"],
            platform: undefined,
            event: undefined,
            triggerTerm: undefined
          })}
        >
          <SelectTrigger className="w-[200px] bg-[#333] border-[#444] text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#272733] border-[#434358]">
            <SelectItem value="contains" className="text-white/90 hover:bg-[#333] focus:bg-[#333]">Contenha</SelectItem>
            <SelectItem value="exact" className="text-white/90 hover:bg-[#333] focus:bg-[#333]">Exata</SelectItem>
            <SelectItem value="any" className="text-white/90 hover:bg-[#333] focus:bg-[#333]">Qualquer mensagem</SelectItem>
            <SelectItem value="integration" className="text-white/90 hover:bg-[#333] focus:bg-[#333]">Integração</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onDelete(trigger.id)}
          className="text-white/50 hover:text-white/90 hover:bg-[#333]"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {(trigger.triggerType === "contains" || trigger.triggerType === "exact") && (
        <Input
          placeholder="Digite o termo..."
          value={trigger.triggerTerm}
          onChange={(e) => onUpdate(trigger.id, { 
            triggerTerm: e.target.value 
          })}
          className="bg-[#333] border-[#444] text-white placeholder:text-white/50"
        />
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
            <SelectContent className="bg-[#272733] border-[#434358]">
              <SelectItem value="kiwify" className="text-white/90 hover:bg-[#333] focus:bg-[#333]">Kiwify</SelectItem>
              <SelectItem value="hotmart" className="text-white/90 hover:bg-[#333] focus:bg-[#333]">Hotmart</SelectItem>
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
              <SelectContent className="bg-[#272733] border-[#434358]">
                <SelectItem value="abandoned" className="text-white/90 hover:bg-[#333] focus:bg-[#333]">Carrinho abandonado</SelectItem>
                <SelectItem value="approved" className="text-white/90 hover:bg-[#333] focus:bg-[#333]">Venda aprovada</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      )}
    </div>
  );
}