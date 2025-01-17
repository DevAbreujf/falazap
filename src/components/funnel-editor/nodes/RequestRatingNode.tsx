import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Star } from 'lucide-react';
import { RequestRatingNodeData } from '@/types/flow';

interface RequestRatingNodeProps {
  data: RequestRatingNodeData;
}

export const RequestRatingNode = memo(({ data }: RequestRatingNodeProps) => {
  return (
    <div className="bg-[#1f1f2a] rounded-2xl w-[300px] shadow-lg shadow-black/20">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-[40px] !h-[12px] !rounded-[6px] !bg-orange-600 !border-2 !border-orange-700 !top-0 !-translate-y-[30px] !left-1/2 !-translate-x-1/2"
      />
      
      <div className="bg-[#1f1f2a] px-4 py-2 flex items-center justify-between border-b border-[#434358]/50">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-orange-500" />
          <h3 className="text-sm font-medium text-zinc-100">Pedir Avaliação</h3>
        </div>
      </div>

      <div className="p-4">
        <div className="text-sm text-zinc-400">
          {data.label || 'Solicite uma avaliação ao cliente'}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-transparent !w-[18px] !h-[18px] !border-[3px] !border-orange-500 !translate-x-[4.5em]"
      />
    </div>
  );
});

RequestRatingNode.displayName = 'RequestRatingNode';