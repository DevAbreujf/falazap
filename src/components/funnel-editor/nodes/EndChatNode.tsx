import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

export const EndChatNode = memo(({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="font-medium mb-2">Finalizar Conversa</div>
      <div className="text-sm text-gray-600">
        {data.label || 'Configure o encerramento'}
      </div>
    </div>
  );
});

EndChatNode.displayName = 'EndChatNode';