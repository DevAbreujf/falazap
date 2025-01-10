import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { EditTagsNodeData } from '@/types/flow';

interface EditTagsNodeProps {
  data: EditTagsNodeData;
}

export const EditTagsNode = memo(({ data }: EditTagsNodeProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="font-medium mb-2">Editar Etiquetas</div>
      <div className="text-sm text-gray-600">
        {data.label || 'Configure as etiquetas'}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
});

EditTagsNode.displayName = 'EditTagsNode';
