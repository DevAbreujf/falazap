import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Bell } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface NotifyAgentNodeData {
  title?: string;
  message?: string;
  rule: 'current' | 'specific';
  agent?: string;
  onlyIfAvailable: boolean;
  activateFailureFlow: boolean;
}

interface NotifyAgentNodeProps {
  data: NotifyAgentNodeData;
}

const mockAgents = [
  { id: '1', name: 'João Silva' },
  { id: '2', name: 'Maria Santos' },
  { id: '3', name: 'Pedro Oliveira' },
];

export const NotifyAgentNode = memo(({ data }: NotifyAgentNodeProps) => {
  const [title, setTitle] = useState(data.title || '');
  const [message, setMessage] = useState(data.message || '');
  const [rule, setRule] = useState<'current' | 'specific'>(data.rule || 'current');
  const [selectedAgents, setSelectedAgents] = useState<string[]>(data.agent ? [data.agent] : []);
  const [onlyIfAvailable, setOnlyIfAvailable] = useState(data.onlyIfAvailable || false);
  const [activateFailureFlow, setActivateFailureFlow] = useState(false);
  const [searchAgent, setSearchAgent] = useState('');

  const filteredAgents = mockAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchAgent.toLowerCase())
  );

  return (
    <div className="bg-[#1f1f2a] rounded-2xl w-[300px] shadow-lg shadow-black/20">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-[40px] !h-[12px] !rounded-[6px] !bg-orange-600 !border-2 !border-orange-700 !top-0 !-translate-y-[30px] !left-1/2 !-translate-x-1/2"
      />
      
      <div className="bg-[#1f1f2a] px-4 py-2 flex items-center justify-between border-b border-[#434358]/50">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-orange-500" />
          <h3 className="text-sm font-medium text-zinc-100">Notificar Atendente</h3>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Título</Label>
            <Input
              placeholder="Digite aqui seu título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[#272733] border-[#434358] text-white"
            />
          </div>

          <div className="space-y-2">
            <Label>Mensagem</Label>
            <Textarea
              placeholder="Digite a mensagem que será enviada"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-[#272733] border-[#434358] text-white"
            />
          </div>

          <div className="space-y-2">
            <Label>Regra</Label>
            <Select value={rule} onValueChange={(value: 'current' | 'specific') => setRule(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma regra" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Atendente atual</SelectItem>
                <SelectItem value="specific">Atendente(s) específico(s)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {rule === 'specific' && (
            <div className="space-y-2">
              <Label>Atendentes</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    {selectedAgents.length > 0
                      ? `${selectedAgents.length} atendente(s) selecionado(s)`
                      : 'Selecione os atendentes'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[320px]">
                  <div className="p-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar atendente..."
                        value={searchAgent}
                        onChange={(e) => setSearchAgent(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  {filteredAgents.map((agent) => (
                    <DropdownMenuItem
                      key={agent.id}
                      onClick={() => {
                        setSelectedAgents((prev) =>
                          prev.includes(agent.id)
                            ? prev.filter((id) => id !== agent.id)
                            : [...prev, agent.id]
                        );
                      }}
                    >
                      <Checkbox
                        checked={selectedAgents.includes(agent.id)}
                        className="mr-2"
                      />
                      {agent.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Switch
              checked={onlyIfAvailable}
              onCheckedChange={setOnlyIfAvailable}
            />
            <Label className="text-sm text-zinc-600">
              Notificar somente se o atendente estiver disponível
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={activateFailureFlow}
              onCheckedChange={(checked) => setActivateFailureFlow(checked as boolean)}
            />
            <Label className="text-sm text-zinc-600">
              Ativar fluxo se não foi possível notificar nenhum atendente
            </Label>
          </div>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500 !translate-x-[4.5em]"
      />

      {activateFailureFlow && (
        <Handle
          type="source"
          position={Position.Right}
          id="failure-flow"
          className="w-3 h-3 bg-zinc-300"
          style={{ top: '75%', transform: 'translateY(-50%) translateX(2em)', zIndex: 1000 }}
        />
      )}
    </div>
  );
});

NotifyAgentNode.displayName = 'NotifyAgentNode';
