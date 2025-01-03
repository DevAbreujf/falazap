import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TriggerNodeProps {
  data: {
    triggerType: string;
    triggerTerm: string;
    platform: string;
    event: string;
  };
  onUpdate: (field: string, value: string) => void;
  onRemove: () => void;
}

export const TriggerNode: React.FC<TriggerNodeProps> = ({ data, onUpdate, onRemove }) => {
  return (
    <div className="p-4 space-y-3 border-t border-zinc-800/50">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-zinc-400">Configuração do Gatilho</span>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onRemove}>
          <X className="h-4 w-4 text-zinc-500 hover:text-zinc-300" />
        </Button>
      </div>

      <Select value={data.triggerType} onValueChange={(value) => onUpdate('triggerType', value)}>
        <SelectTrigger className="w-full h-9 bg-zinc-950/50 border-zinc-800 text-sm">
          <SelectValue placeholder="Selecione a condição" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="contains">Contenha</SelectItem>
          <SelectItem value="exact">Exata</SelectItem>
          <SelectItem value="any">Qualquer mensagem</SelectItem>
          <SelectItem value="integration">Integração</SelectItem>
        </SelectContent>
      </Select>

      {(data.triggerType === 'contains' || data.triggerType === 'exact') && (
        <Input
          placeholder="Digite o termo"
          className="h-9 bg-zinc-950/50 border-zinc-800 text-sm"
          value={data.triggerTerm}
          onChange={(e) => onUpdate('triggerTerm', e.target.value)}
        />
      )}

      {data.triggerType === 'integration' && (
        <div className="space-y-3">
          <Select value={data.platform} onValueChange={(value) => onUpdate('platform', value)}>
            <SelectTrigger className="w-full h-9 bg-zinc-950/50 border-zinc-800 text-sm">
              <SelectValue placeholder="Selecione a plataforma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kiwify">Kiwify</SelectItem>
              <SelectItem value="hotmart">Hotmart</SelectItem>
            </SelectContent>
          </Select>

          {data.platform && (
            <Select value={data.event} onValueChange={(value) => onUpdate('event', value)}>
              <SelectTrigger className="w-full h-9 bg-zinc-950/50 border-zinc-800 text-sm">
                <SelectValue placeholder="Selecione o evento de gatilho" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="approved">Venda aprovada</SelectItem>
                <SelectItem value="canceled">Venda cancelada</SelectItem>
                <SelectItem value="refund">Reembolso</SelectItem>
                <SelectItem value="abandoned">Carrinho abandonado</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-primary border-2 border-primary-foreground rounded-full"
        style={{ right: -6 }}
      />
    </div>
  );
};