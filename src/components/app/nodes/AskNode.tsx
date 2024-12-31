import { memo } from "react";
import { HelpCircle } from "lucide-react";
import BaseNode from "./BaseNode";

function AskNode() {
  return (
    <BaseNode
      data={{
        label: "Pergunta",
        icon: <HelpCircle className="w-5 h-5 text-primary" />,
        children: (
          <div className="space-y-2">
            <p className="text-sm text-white/70">Componente de pergunta em desenvolvimento</p>
          </div>
        ),
      }}
    />
  );
}

export default memo(AskNode);