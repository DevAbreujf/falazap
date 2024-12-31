import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ArrowLeft, Bolt, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import StartNode from "@/components/app/nodes/StartNode";

const nodeTypes = {
  start: StartNode,
};

const initialNodes = [
  {
    id: "inicio",
    type: "start",
    data: {
      label: "Início",
      description: "Defina tempo mínimo para o funil ser disparado novamente",
      condition: "exact",
      term: "",
      timeValue: 0,
      timeUnit: "minutes",
      onConditionChange: (value: string) => {
        console.log("Condition changed:", value);
      },
      onTermChange: (value: string) => {
        console.log("Term changed:", value);
      },
      onTimeValueChange: (value: number) => {
        console.log("Time value changed:", value);
      },
      onTimeUnitChange: (value: "seconds" | "minutes" | "hours") => {
        console.log("Time unit changed:", value);
      },
    },
    position: { x: 250, y: 50 },
  },
];

export default function FunnelEditor() {
  const navigate = useNavigate();
  const [funnelTitle, setFunnelTitle] = useState("Funil sem título");
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleSave = () => {
    console.log("Saving funnel:", { title: funnelTitle, nodes, edges });
    navigate("/funnels");
  };

  return (
    <div className="flex flex-col w-full h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/funnels")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Input
            value={funnelTitle}
            onChange={(e) => setFunnelTitle(e.target.value)}
            className="text-xl font-semibold bg-transparent border-none h-auto p-0 focus-visible:ring-0 w-[300px]"
          />
          <Button variant="outline" size="sm" className="gap-2">
            <Bolt className="h-4 w-4" />
            Disparo Manual
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/funnels")}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Salvar
          </Button>
        </div>
      </header>

      {/* Sidebar */}
      <div className="flex h-[calc(100vh-73px)]">
        <aside className="w-64 p-4 border-r border-border/50">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">Mensagens</h2>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-lg">💬</span>
                  Texto
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-lg">🖼️</span>
                  Imagem
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-lg">🎵</span>
                  Música
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-lg">🎤</span>
                  Áudio
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-lg">🎥</span>
                  Vídeo
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-lg">📄</span>
                  Documento
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Lógica</h2>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-lg">🔀</span>
                  Caminhos
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-lg">⏲️</span>
                  Esperar
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-lg">❓</span>
                  Perguntar
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "h-20 flex flex-col items-center justify-center gap-2",
                    "relative"
                  )}
                >
                  <span className="text-lg">🏷️</span>
                  Tags
                  <span className="absolute -top-1 -right-1 bg-primary text-xs px-1.5 py-0.5 rounded-full">
                    Novo
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-lg">📝</span>
                  Variáveis
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Flow Editor */}
        <div className="flex-1 h-full bg-[#141414]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
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