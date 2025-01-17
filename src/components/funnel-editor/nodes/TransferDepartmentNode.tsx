import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Users } from 'lucide-react';

interface TransferDepartmentNodeData {
  label: string;
}

export const TransferDepartmentNode = memo(({ data }: { data: TransferDepartmentNodeData }) => {
  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm min-w-[320px]" style={{ overflow: 'visible' }}>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-4 h-4 text-zinc-500" />
          <span className="font-medium">Transferir para setor</span>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="!w-[40px] !h-[12px] !rounded-[6px] !bg-orange-600 !border-2 !border-orange-700 !top-0 !-translate-y-[30px] !left-1/2 !-translate-x-1/2"
      />
      
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      />
    </div>
  );
});

TransferDepartmentNode.displayName = 'TransferDepartmentNode';