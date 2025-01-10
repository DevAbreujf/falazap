import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { RequestRatingNodeData } from '@/types/flow';

interface RequestRatingNodeProps {
  data: RequestRatingNodeData;
}

export const RequestRatingNode = memo(({ data }: RequestRatingNodeProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="font-medium mb-2">Pedir Avaliação</div>
      <div className="text-sm text-gray-600">
        {data.label || 'Solicite uma avaliação ao cliente'}
      </div>
    </div>
  );
});

RequestRatingNode.displayName = 'RequestRatingNode';
