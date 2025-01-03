import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Zap, Save, Upload, Download } from "lucide-react";
import { ElementsSidebar } from "@/components/funnel-editor/ElementsSidebar";

const initialNodes = [
  {
    id: "1",
    type: "start",
    position: { x: 400, y: 100 },
    data: { label: "Início" },
  },
];

export default function FunnelEditor() {
  const navigate = useNavigate();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isActive, setIsActive] = useState(false);

  const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds));

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Left Sidebar */}
      <ElementsSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-2 bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/funnels")}
              className="text-primary hover:text-primary/80"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <h1 className="text-lg font-medium text-primary">Funil sem título</h1>
            
            <Button variant="secondary" size="sm" className="gap-2">
              <Zap className="h-4 w-4" />
              Disparo Manual
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch 
                checked={isActive} 
                onCheckedChange={setIsActive}
              />
              <span className="text-sm text-muted-foreground">
                {isActive ? "Ativo" : "Inativo"}
              </span>
            </div>

            <Button variant="ghost" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Importar
            </Button>

            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>

            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>
        </header>

        {/* Flow Editor */}
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}