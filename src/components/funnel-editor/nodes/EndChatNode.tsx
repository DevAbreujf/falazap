import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Check } from 'lucide-react';
import { EndChatNodeData } from '@/types/flow';

interface EndChatNodeProps {
  data: EndChatNodeData;
}

export const EndChatNode = memo(({ data }: EndChatNodeProps) => {
  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm min-w-[280px]">
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-zinc-500" />
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-md bg-emerald-50">
            <Check className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-base font-medium text-zinc-900">
            Finalizar conversa
          </span>
        </div>

        <p className="text-sm text-zinc-500">
          A conversa é finalizada
        </p>
      </div>
    </div>
  );
});

EndChatNode.displayName = 'EndChatNode';