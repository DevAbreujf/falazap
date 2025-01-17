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
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm min-w-[320px] relative" style={{ overflow: 'visible' }}>
      <Handle
        type="target"
        position={Position.Top}
        className="!w-[40px] !h-[12px] !rounded-[6px] !bg-orange-600 !border-2 !border-orange-700 !top-0 !-translate-y-[30px] !left-1/2 !-translate-x-1/2"
      />
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <Building2 className="w-4 h-4 text-zinc-500" />
          <span className="font-medium">Transferir para setor</span>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Regra</Label>
            <Select value={rule} onValueChange={(value: 'specific' | 'previous') => setRule(value)}>
              <SelectTrigger>
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
              <Label>Setor</Label>
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
          style={{ top: '75%', transform: 'translateY(-50%) translateX(2em)', zIndex: 1000 }}
        />
      )}
    </div>
  );
});

TransferDepartmentNode.displayName = 'TransferDepartmentNode';