import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { NotifyAgentNodeData } from '@/types/flow';

interface NotifyAgentNodeProps {
  data: NotifyAgentNodeData;
}

export const NotifyAgentNode = memo(({ data }: NotifyAgentNodeProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="font-medium mb-2">Notificar Atendente</div>
      <div className="text-sm text-gray-600">
        {data.label || 'Configure a notificação'}
      </div>
    </div>
  );
});

NotifyAgentNode.displayName = 'NotifyAgentNode';
