import { memo } from "react";
import { GitBranch } from "lucide-react";
import BaseNode from "./BaseNode";

function PathNode() {
  return (
    <BaseNode
      data={{
        label: "Caminho",
        icon: <GitBranch className="w-5 h-5 text-primary" />,
        children: (
          <div className="space-y-2">
            <p className="text-sm text-white/70">Componente de caminho em desenvolvimento</p>
          </div>
        ),
      }}
    />
  );
}

export default memo(PathNode);