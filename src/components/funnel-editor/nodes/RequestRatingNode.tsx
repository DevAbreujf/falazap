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

const ratingMessages = [
  { text: "Muito desapontado", color: "#EF4444" },
  { text: "Desapontado", color: "#F97316" },
  { text: "Neutro", color: "#EAB308" },
  { text: "Satisfeito", color: "#22C55E" },
  { text: "Muito Satisfeito", color: "#16A34A" }
];

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
      
      <div className="px-4 py-3 flex items-center gap-2 border-b border-zinc-200 bg-white">
        <Star className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-medium text-zinc-900">Pedir Avaliação</h3>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <label className="text-sm font-medium text-zinc-600 block mb-2">Mensagem</label>
          <Input 
            placeholder="Digite a mensagem que irá enviar"
            className="w-full text-sm"
          />
        </div>

        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((number, index) => (
            <div key={number} className="flex items-center gap-3 group relative">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white"
                style={{ backgroundColor: ratingMessages[index].color }}
              >
                {number}
              </div>
              <Input
                value={messages[number - 1]}
                onChange={(e) => {
                  const newMessages = [...messages];
                  newMessages[number - 1] = e.target.value;
                  setMessages(newMessages);
                }}
                placeholder={ratingMessages[index].text}
                className="flex-1 text-sm transition-all"
              />
              <Handle
                type="source"
                position={Position.Right}
                id={`rating-${number}`}
                className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-primary"
                style={{ right: '-1.2em', top: '1px' }}
              />
            </div>
          ))}
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-600 block mb-3">O que deve ser avaliado</label>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedType("agent")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm transition-all duration-300 ${
                selectedType === "agent"
                  ? "border-primary bg-primary/5 text-primary w-auto"
                  : "border-zinc-200 hover:border-zinc-300 w-10"
              }`}
            >
              <User className="h-4 w-4" />
              {selectedType === "agent" && "Atendente"}
            </button>
            <button
              onClick={() => setSelectedType("organization")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm transition-all duration-300 ${
                selectedType === "organization"
                  ? "border-primary bg-primary/5 text-primary w-auto"
                  : "border-zinc-200 hover:border-zinc-300 w-10"
              }`}
            >
              <Building className="h-4 w-4" />
              {selectedType === "organization" && "Organização"}
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-600">
              Ativar fluxo para resposta inválida
            </span>
            <Switch
              checked={activateInvalidFlow}
              onCheckedChange={setActivateInvalidFlow}
            />
          </div>
          {activateInvalidFlow && (
            <Handle
              type="source"
              position={Position.Right}
              id="invalid-flow"
              className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-primary"
              style={{ right: '-1.2em', top: '1px' }}
            />
          )}
        </div>

        <div className="space-y-4">
          <div className="relative">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">
                Ativar fluxo se não responder
              </span>
              <Switch
                checked={activateNoResponseFlow}
                onCheckedChange={setActivateNoResponseFlow}
              />
            </div>
            {activateNoResponseFlow && (
              <Handle
                type="source"
                position={Position.Right}
                id="no-response-flow"
                className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-primary"
                style={{ right: '-1.2em', top: '1px' }}
              />
            )}
          </div>
          
          {activateNoResponseFlow && (
            <div className="space-y-3 bg-zinc-50 p-3 rounded-md">
              <div className="flex justify-between text-xs text-zinc-500">
                <span>5 minutos</span>
                <span>24 horas</span>
              </div>
              <Slider
                value={[timeoutMinutes]}
                onValueChange={([value]) => setTimeoutMinutes(value)}
                min={5}
                max={1440}
                step={5}
                className="w-full"
              />
              <div className="text-sm text-center font-medium text-zinc-700">
                {formatTime(timeoutMinutes)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

RequestRatingNode.displayName = 'RequestRatingNode';