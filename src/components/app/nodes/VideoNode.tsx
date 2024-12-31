import { memo } from "react";
import { Video } from "lucide-react";
import BaseNode from "./BaseNode";

function VideoNode() {
  return (
    <BaseNode
      data={{
        label: "Vídeo",
        icon: <Video className="w-5 h-5 text-primary" />,
        children: (
          <div className="space-y-2">
            <p className="text-sm text-white/70">Componente de vídeo em desenvolvimento</p>
          </div>
        ),
      }}
    />
  );
}

export default memo(VideoNode);