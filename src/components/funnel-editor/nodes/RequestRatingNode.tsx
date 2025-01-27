import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Star, User, Building } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { RequestRatingNodeData } from '@/types/flow';

interface RequestRatingNodeProps {
  data: RequestRatingNodeData;
}

export const RequestRatingNode = memo(({ data }: RequestRatingNodeProps) => {
  const [selectedType, setSelectedType] = useState<"agent" | "organization" | null>(null);
  const [activateInvalidFlow, setActivateInvalidFlow] = useState(false);
  const [activateNoResponseFlow, setActivateNoResponseFlow] = useState(false);
  const [timeoutMinutes, setTimeoutMinutes] = useState(5);
  const [messages, setMessages] = useState<string[]>(Array(5).fill(""));

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} minutos`;
    const hours = Math.floor(minutes / 60);
    return `${hours} ${hours === 1 ? "hora" : "horas"}`;
  };

  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm w-[300px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-zinc-300 !-top-3"
      />
      
      <div className="px-4 py-2 flex items-center gap-2 border-b border-zinc-200">
        <Star className="h-4 w-4 text-zinc-500" />
        <h3 className="text-sm font-medium text-zinc-900">Pedir Avaliação</h3>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <label className="text-sm text-zinc-600 block mb-1">Mensagem</label>
          <Input 
            placeholder="Digite a mensagem que irá enviar"
            className="w-full text-sm"
          />
        </div>

        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((number) => (
            <div key={number} className="flex items-center gap-2 relative">
              <span className="text-sm font-medium text-zinc-700 w-6">{number}</span>
              <Input
                value={messages[number - 1]}
                onChange={(e) => {
                  const newMessages = [...messages];
                  newMessages[number - 1] = e.target.value;
                  setMessages(newMessages);
                }}
                placeholder={`Mensagem para nota ${number}`}
                className="flex-1 text-sm"
              />
              <Handle
                type="source"
                position={Position.Right}
                id={`rating-${number}`}
                className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500"
                style={{ right: '-1.2em' }}
              />
            </div>
          ))}
        </div>

        <div>
          <label className="text-sm text-zinc-600 block mb-2">O que deve ser avaliado</label>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedType("agent")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm flex-1 ${
                selectedType === "agent"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-zinc-200 hover:border-zinc-300"
              }`}
            >
              <User className="h-4 w-4" />
              {selectedType === "agent" ? "Atendente" : ""}
            </button>
            <button
              onClick={() => setSelectedType("organization")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm flex-1 ${
                selectedType === "organization"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-zinc-200 hover:border-zinc-300"
              }`}
            >
              <Building className="h-4 w-4" />
              {selectedType === "organization" ? "Organização" : ""}
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center justify-between">
            <Switch
              checked={activateInvalidFlow}
              onCheckedChange={setActivateInvalidFlow}
            />
            <span className="text-sm text-zinc-600">
              Ativar fluxo para resposta inválida
            </span>
          </div>
          {activateInvalidFlow && (
            <Handle
              type="source"
              position={Position.Right}
              id="invalid-flow"
              className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500"
              style={{ right: '-1.2em' }}
            />
          )}
        </div>

        <div className="space-y-4">
          <div className="relative">
            <div className="flex items-center justify-between">
              <Switch
                checked={activateNoResponseFlow}
                onCheckedChange={setActivateNoResponseFlow}
              />
              <span className="text-sm text-zinc-600">
                Ativar fluxo se não responder
              </span>
            </div>
            {activateNoResponseFlow && (
              <Handle
                type="source"
                position={Position.Right}
                id="no-response-flow"
                className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500"
                style={{ right: '-1.2em' }}
              />
            )}
          </div>
          
          {activateNoResponseFlow && (
            <div className="space-y-2">
              <label className="text-sm text-zinc-600 block">
                Tempo para considerar sem resposta: {formatTime(timeoutMinutes)}
              </label>
              <Slider
                value={[timeoutMinutes]}
                onValueChange={([value]) => setTimeoutMinutes(value)}
                min={5}
                max={1440} // 24 hours in minutes
                step={5}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

RequestRatingNode.displayName = 'RequestRatingNode';