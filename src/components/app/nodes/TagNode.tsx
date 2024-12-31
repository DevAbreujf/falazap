import { memo } from "react";
import { Tag } from "lucide-react";
import BaseNode from "./BaseNode";

function TagNode() {
  return (
    <BaseNode
      data={{
        label: "Tag",
        icon: <Tag className="w-5 h-5 text-primary" />,
        children: (
          <div className="space-y-2">
            <p className="text-sm text-white/70">Componente de tag em desenvolvimento</p>
          </div>
        ),
      }}
    />
  );
}

export default memo(TagNode);