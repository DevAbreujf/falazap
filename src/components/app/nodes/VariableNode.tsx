import { memo } from "react";
import { Variable } from "lucide-react";
import BaseNode from "./BaseNode";

function VariableNode() {
  return (
    <BaseNode
      data={{
        label: "Variável",
        icon: <Variable className="w-5 h-5 text-primary" />,
        children: (
          <div className="space-y-2">
            <p className="text-sm text-white/70">Componente de variável em desenvolvimento</p>
          </div>
        ),
      }}
    />
  );
}

export default memo(VariableNode);