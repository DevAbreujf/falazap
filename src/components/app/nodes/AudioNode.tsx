import { memo } from "react";
import { Music } from "lucide-react";
import BaseNode from "./BaseNode";

function AudioNode() {
  return (
    <BaseNode
      data={{
        label: "Áudio",
        icon: <Music className="w-5 h-5 text-primary" />,
        children: (
          <div className="space-y-2">
            <p className="text-sm text-white/70">Componente de áudio em desenvolvimento</p>
          </div>
        ),
      }}
    />
  );
}

export default memo(AudioNode);