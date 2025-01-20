import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Building2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DepartmentSelect } from '@/components/app/users/DepartmentSelect';

interface TransferDepartmentNodeData {
  label?: string;
  rule: 'specific' | 'previous';
  department?: string;
  requirePermission: boolean;
  activateFailureFlow: boolean;
}

interface TransferDepartmentNodeProps {
  data: TransferDepartmentNodeData;
}

export const TransferDepartmentNode = memo(({ data }: TransferDepartmentNodeProps) => {
  const [rule, setRule] = useState<'specific' | 'previous'>(data.rule || 'specific');
  const [department, setDepartment] = useState(data.department || '');
  const [requirePermission, setRequirePermission] = useState(data.requirePermission || false);
  const [activateFailureFlow, setActivateFailureFlow] = useState(data.activateFailureFlow || false);

  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm w-[300px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-zinc-300 !-top-3"
        style={{ top: "-20px !important" }}
      />
      
      <div className="px-4 py-2 flex items-center justify-between border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-zinc-500" />
          <span className="font-medium text-zinc-900">Transferir para setor</span>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-zinc-700">Regra</Label>
            <Select value={rule} onValueChange={(value: 'specific' | 'previous') => setRule(value)}>
              <SelectTrigger className="bg-white border-zinc-200">
                <SelectValue placeholder="Selecione uma regra" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="specific">Específico</SelectItem>
                <SelectItem value="previous">Setor que o contato estava anteriormente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {rule === 'specific' && (
            <div className="space-y-2">
              <Label className="text-zinc-700">Setor</Label>
              <DepartmentSelect 
                value={department}
                onValueChange={setDepartment}
              />
              {!department && (
                <p className="text-sm text-red-500 mt-1">
                  É necessário escolher um setor
                </p>
              )}
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Switch
              checked={requirePermission}
              onCheckedChange={setRequirePermission}
            />
            <Label className="text-sm text-zinc-600">
              Transferir somente se o atendente atual tem permissão
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={activateFailureFlow}
              onCheckedChange={(checked) => setActivateFailureFlow(checked as boolean)}
            />
            <Label className="text-sm text-zinc-600">
              Ativar fluxo se não for possível transferir para o setor
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

TransferDepartmentNode.displayName = 'TransferDepartmentNode';