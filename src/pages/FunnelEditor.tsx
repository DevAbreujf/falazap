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
import { ArrowLeft, Zap, Save, Upload, Download, Flag, Clock, X, Plus, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { ElementsSidebar } from "@/components/funnel-editor/ElementsSidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialNodes = [
  {
    id: "1",
    type: "start",
    position: { x: 400, y: 100 },
    data: { 
      label: "Início",
      description: "Definir tempo mínimo para o funil ser disparado novamente",
      time: 0
    },
    className: "flow-node start-node",
  },
];

export default function FunnelEditor() {
  const navigate = useNavigate();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isActive, setIsActive] = useState(false);
  const [isTimeSettingsOpen, setIsTimeSettingsOpen] = useState(false);

  const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds));

  const StartNode = ({ data }: any) => {
    return (
      <div className="w-[280px] bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-4 py-3 flex items-center gap-2 border-b border-zinc-800/50">
          <Flag className="h-4 w-4 text-orange-500" />
          <span className="text-sm font-medium text-zinc-100">{data.label}</span>
        </div>
        
        <div className="p-4 space-y-4">
          <div 
            className="flex items-start gap-2 cursor-pointer"
            onClick={() => setIsTimeSettingsOpen(!isTimeSettingsOpen)}
          >
            <Clock className="h-4 w-4 text-zinc-400 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs text-zinc-400">{data.description}</p>
                {isTimeSettingsOpen ? (
                  <ChevronUp className="h-4 w-4 text-zinc-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-zinc-400" />
                )}
              </div>
            </div>
          </div>
          
          {isTimeSettingsOpen && (
            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="w-16 h-10 bg-zinc-950/50 border border-zinc-800 rounded flex items-center justify-center">
                <input 
                  type="number" 
                  min="0"
                  value={data.time}
                  className="w-12 text-center bg-transparent text-sm text-zinc-400 focus:outline-none"
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setNodes((nds) =>
                      nds.map((node) =>
                        node.id === "1"
                          ? { ...node, data: { ...node.data, time: value } }
                          : node
                      )
                    );
                  }}
                />
              </div>
              
              <Select>
                <SelectTrigger className="flex-1 h-10 bg-zinc-950/50 border-zinc-800 text-sm">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minutes">Minutos</SelectItem>
                  <SelectItem value="hours">Horas</SelectItem>
                  <SelectItem value="days">Dias</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-400 hover:text-zinc-300">
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="px-4 py-3 bg-zinc-900/50 border-t border-zinc-800/50 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-orange-500 hover:text-orange-400">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar gatilho
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  const nodeTypes = {
    start: StartNode,
  };

  return (
    <div className="flex h-screen w-full bg-background">
      <ElementsSidebar />

      <div className="flex-1 flex flex-col">
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

        <div className="flex-1">
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