import { memo } from "react";
import { Clock } from "lucide-react";
import BaseNode from "./BaseNode";

function WaitNode() {
  return (
    <BaseNode
      data={{
        label: "Espera",
        icon: <Clock className="w-5 h-5 text-primary" />,
        children: (
          <div className="space-y-2">
            <p className="text-sm text-white/70">Componente de espera em desenvolvimento</p>
          </div>
        ),
      }}
    />
  );
}

export default memo(WaitNode);