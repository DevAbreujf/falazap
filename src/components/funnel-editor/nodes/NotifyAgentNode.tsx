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
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm w-[300px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-zinc-300"
      />
      
      <div className="px-4 py-2 flex items-center justify-between border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-zinc-500" />
          <h3 className="text-sm font-medium text-zinc-900">Notificar Atendente</h3>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-zinc-700">Título</Label>
            <Input
              placeholder="Digite aqui seu título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white border-zinc-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-700">Mensagem</Label>
            <Textarea
              placeholder="Digite a mensagem que será enviada"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-white border-zinc-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-700">Regra</Label>
            <Select value={rule} onValueChange={(value: 'current' | 'specific') => setRule(value)}>
              <SelectTrigger className="bg-white border-zinc-200">
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
              <Label className="text-zinc-700">Atendentes</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left bg-white border-zinc-200">
                    {selectedAgents.length > 0
                      ? `${selectedAgents.length} atendente(s) selecionado(s)`
                      : 'Selecione os atendentes'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[320px]">
                  <div className="p-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-400" />
                      <Input
                        placeholder="Buscar atendente..."
                        value={searchAgent}
                        onChange={(e) => setSearchAgent(e.target.value)}
                        className="pl-8 bg-white border-zinc-200"
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
        className="w-3 h-3 !bg-zinc-300"
      />

      {activateFailureFlow && (
        <Handle
          type="source"
          position={Position.Right}
          id="failure-flow"
          className="w-3 h-3 !bg-zinc-300"
          style={{ top: '75%' }}
        />
      )}
    </div>
  );
});

NotifyAgentNode.displayName = 'NotifyAgentNode';