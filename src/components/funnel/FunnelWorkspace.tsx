import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Save } from "lucide-react";

interface FunnelWorkspaceProps {
  autoSaveStatus: "saving" | "saved";
  onElementsChange: () => void;
}

export function FunnelWorkspace({ autoSaveStatus, onElementsChange }: FunnelWorkspaceProps) {
  const [elements, setElements] = useState<any[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const toolType = e.dataTransfer.getData("toolType");
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newElement = {
      id: Date.now(),
      type: toolType,
      position: { x, y },
    };

    setElements((prev) => [...prev, newElement]);
    onElementsChange();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex-1 overflow-hidden p-6">
      <Card className="relative h-full overflow-hidden">
        {/* Header with autosave status */}
        <div className="absolute right-4 top-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Save className="h-4 w-4" />
          {autoSaveStatus === "saving" ? "Salvando..." : "Todas as alterações salvas"}
        </div>

        {/* Workspace with dotted background */}
        <div
          className="h-full w-full overflow-auto p-8"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {elements.map((element) => (
            <div
              key={element.id}
              className="absolute rounded-lg border bg-card p-4 shadow-sm"
              style={{
                left: element.position.x,
                top: element.position.y,
              }}
            >
              {element.type}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}