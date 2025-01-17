import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { UserRound } from 'lucide-react';
import { Label } from '@/components/ui/label';
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
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface TransferAgentNodeData {
  label?: string;
  rule: 'specific' | 'random' | 'least_chats' | 'previous';
  agent?: string;
  onlyIfAvailable: boolean;
  activateFailureFlow: boolean;
}

interface TransferAgentNodeProps {
  data: TransferAgentNodeData;
}

const mockAgents = [
  { id: '1', name: 'João Silva' },
  { id: '2', name: 'Maria Santos' },
  { id: '3', name: 'Pedro Oliveira' },
];

export const TransferAgentNode = memo(({ data }: TransferAgentNodeProps) => {
  const [rule, setRule] = useState<'specific' | 'random' | 'least_chats' | 'previous'>(data.rule || 'specific');
  const [agent, setAgent] = useState(data.agent || '');
  const [onlyIfAvailable, setOnlyIfAvailable] = useState(data.onlyIfAvailable || false);
  const [activateFailureFlow, setActivateFailureFlow] = useState(data.activateFailureFlow || false);
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
          <UserRound className="w-4 h-4 text-zinc-500" />
          <span className="font-medium">Transferir para atendente</span>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Regra</Label>
            <Select value={rule} onValueChange={(value: 'specific' | 'random' | 'least_chats' | 'previous') => setRule(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma regra" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="specific">Específico</SelectItem>
                <SelectItem value="random">Aleatoriamente</SelectItem>
                <SelectItem value="least_chats">Com menos conversas em aberto</SelectItem>
                <SelectItem value="previous">Quem o atendeu anteriormente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {rule === 'specific' && (
            <div className="space-y-2">
              <Label>Atendentes</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    {agent ? mockAgents.find(a => a.id === agent)?.name : 'Selecione um atendente'}
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
                      onClick={() => setAgent(agent.id)}
                    >
                      {agent.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {rule === 'specific' && !agent && (
                <p className="text-sm text-red-500 mt-1">
                  É necessário escolher um atendente
                </p>
              )}
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Switch
              checked={onlyIfAvailable}
              onCheckedChange={setOnlyIfAvailable}
            />
            <Label className="text-sm text-zinc-600">
              Transferir somente se o atendente está disponível
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={activateFailureFlow}
              onCheckedChange={(checked) => setActivateFailureFlow(checked as boolean)}
            />
            <Label className="text-sm text-zinc-600">
              Ativar fluxo se não for possível transferir para nenhum atendente
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

TransferAgentNode.displayName = 'TransferAgentNode';