import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { ArrowRight } from 'lucide-react';

interface ForwardingNodeData {
  label: string;
}

export const ForwardingNode = memo(({ data }: { data: ForwardingNodeData }) => {
  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm w-[300px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-zinc-300"
      />
      
      <div className="px-4 py-2 flex items-center justify-between border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <ArrowRight className="h-4 w-4 text-zinc-500" />
          <h3 className="text-sm font-medium text-zinc-900">Encaminhamentos</h3>
        </div>
      </div>

      <div className="p-4">
        <div className="text-sm text-zinc-600">
          {data.label || 'Configure as regras de encaminhamento'}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-zinc-300"
        style={{ transform: 'translateX(2em)' }}
      />
    </div>
  );
});

ForwardingNode.displayName = 'ForwardingNode';