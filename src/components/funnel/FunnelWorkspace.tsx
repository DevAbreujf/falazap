import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Save } from "lucide-react";
import {
  ReactFlow,
  Background,
  Controls,
  Connection,
  Edge,
  Node,
  addEdge,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

interface FunnelWorkspaceProps {
  autoSaveStatus: "saving" | "saved";
  onElementsChange: () => void;
}

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Início" },
    position: { x: 250, y: 50 },
    style: {
      background: "rgb(17, 17, 17)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "15px 25px",
      width: 200,
    },
  },
];

export function FunnelWorkspace({ autoSaveStatus, onElementsChange }: FunnelWorkspaceProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
      onElementsChange();
    },
    [onElementsChange]
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("toolType");
      
      // Get the drop position relative to the viewport
      const reactFlowBounds = document.querySelector(".react-flow")?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type: "default",
        position,
        data: { label: type },
        style: {
          background: "rgb(35, 35, 35)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "15px 25px",
          width: 200,
        },
      };

      setNodes((nds) => [...nds, newNode]);
      onElementsChange();
    },
    [setNodes, onElementsChange]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div className="flex-1 overflow-hidden p-6">
      <Card className="relative h-full overflow-hidden bg-[#0A0A0A]">
        {/* Header with autosave status */}
        <div className="absolute right-4 top-4 z-10 flex items-center gap-2 text-sm text-muted-foreground">
          <Save className="h-4 w-4" />
          {autoSaveStatus === "saving" ? "Salvando..." : "Todas as alterações salvas"}
        </div>

        {/* Flow workspace */}
        <div className="h-full w-full" onDrop={onDrop} onDragOver={onDragOver}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            deleteKeyCode={["Backspace", "Delete"]}
            className="bg-[#0A0A0A]"
          >
            <Background color="#333" gap={20} />
            <Controls className="bg-[#1A1A1A] border-[#333] fill-white" />
          </ReactFlow>
        </div>
      </Card>
    </div>
  );
}