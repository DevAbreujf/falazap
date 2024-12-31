import { memo } from "react";
import { FileText } from "lucide-react";
import BaseNode from "./BaseNode";

function DocumentNode() {
  return (
    <BaseNode
      data={{
        label: "Documento",
        icon: <FileText className="w-5 h-5 text-primary" />,
        children: (
          <div className="space-y-2">
            <p className="text-sm text-white/70">Componente de documento em desenvolvimento</p>
          </div>
        ),
      }}
    />
  );
}

export default memo(DocumentNode);