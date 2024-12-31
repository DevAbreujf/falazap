import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

interface BaseNodeProps {
  data: {
    label: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
  };
}

function BaseNode({ data }: BaseNodeProps) {
  return (
    <div className="p-6 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 text-white min-w-[320px] shadow-xl">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-1">
          {data.icon}
          <h3 className="font-semibold text-xl text-primary">{data.label}</h3>
        </div>
        {data.children}
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="!bg-primary !w-3 !h-3 !border-2 !border-primary/50"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-primary !w-3 !h-3 !border-2 !border-primary/50"
      />
    </div>
  );
}

export default memo(BaseNode);