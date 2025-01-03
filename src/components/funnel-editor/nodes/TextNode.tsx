import { Handle, Position } from '@xyflow/react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface TextNodeProps {
  data: {
    content: string;
  };
  id: string;
}

export function TextNode({ data, id }: TextNodeProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="w-[280px] bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden"
      onClick={handleClick}
    >
      <div className="px-4 py-3 bg-zinc-900/80 border-b border-zinc-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-100">Texto</span>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-400 hover:text-zinc-100">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4">
        <Textarea
          placeholder="Conteúdo da mensagem"
          className="min-h-[100px] bg-zinc-950/50 border-zinc-800 resize-none text-zinc-100"
          value={data.content}
          onClick={(e) => e.stopPropagation()}
        />
        <div className="flex justify-end mt-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-zinc-400 hover:text-zinc-300"
          >
            Ajuda
          </Button>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-zinc-300/20 border-2 border-zinc-300 rounded-full"
        style={{ top: -6 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-zinc-300/20 border-2 border-zinc-300 rounded-full"
        style={{ bottom: -6 }}
      />
    </div>
  );
}