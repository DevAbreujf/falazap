import { memo } from "react";
import { Image } from "lucide-react";
import BaseNode from "./BaseNode";

function ImageNode() {
  return (
    <BaseNode
      data={{
        label: "Imagem",
        icon: <Image className="w-5 h-5 text-primary" />,
        children: (
          <div className="space-y-2">
            {/* Image upload functionality will be implemented later */}
            <p className="text-sm text-white/70">Componente de imagem em desenvolvimento</p>
          </div>
        ),
      }}
    />
  );
}

export default memo(ImageNode);