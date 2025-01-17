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
import { NotifyAgentNodeData } from '@/types/flow';

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
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm min-w-[320px] relative" style={{ overflow: 'visible' }}>
      <Handle
        type="target"
        position={Position.Top}
        className="!w-[40px] !h-[12px] !rounded-[6px] !bg-orange-600 !border-2 !border-orange-700 !top-0 !-translate-y-[30px] !left-1/2 !-translate-x-1/2"
      />
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="w-4 h-4 text-zinc-500" />
          <span className="font-medium">Notificar Atendente</span>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Título</Label>
            <Input
              placeholder="Digite aqui seu título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Mensagem</Label>
            <Textarea
              placeholder="Digite a mensagem que será enviada"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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

      {/* Main handle for the node */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-zinc-300"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      />

      {/* Conditional handle for failure flow */}
      {activateFailureFlow && (
        <Handle
          type="source"
          position={Position.Right}
          id="failure-flow"
          className="w-3 h-3 bg-zinc-300"
          style={{ top: '75%', transform: 'translateY(-50%)' }}
        />
      )}
    </div>
  );
});

NotifyAgentNode.displayName = 'NotifyAgentNode';