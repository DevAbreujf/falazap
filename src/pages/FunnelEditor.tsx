import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  NodeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Zap, Save, Upload, Download } from "lucide-react";
import { ElementsSidebar } from "@/components/funnel-editor/ElementsSidebar";
import { StartNode } from "@/components/funnel-editor/nodes/StartNode";

const initialNodes = [
  {
    id: "1",
    type: "start",
    position: { x: 400, y: 100 },
    deletable: false,
    draggable: true,
    data: {
      label: "Início",
      description: "Definir tempo mínimo para o funil ser disparado novamente",
      time: 0,
      triggers: [],
    },
  },
];

export default function FunnelEditor() {
  const navigate = useNavigate();
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isActive, setIsActive] = useState(false);
  const [isTimeSettingsOpen, setIsTimeSettingsOpen] = useState(false);

  const onNodesChange = (changes: NodeChange[]) => {
    const filteredChanges = changes.filter((change) => {
      if ('type' in change && change.type === 'remove') {
        const node = nodes.find((n) => n.id === change.id);
        return node?.type !== 'start';
      }
      return true;
    });
    
    setNodes((nds) => {
      const nextNodes = [...nds];
      filteredChanges.forEach((change) => {
        if ('position' in change && change.position) {
          const index = nextNodes.findIndex((n) => n.id === change.id);
          if (index !== -1) {
            nextNodes[index] = { ...nextNodes[index], position: change.position };
          }
        }
      });
      return nextNodes;
    });
  };

  const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds));

  const updateNodeData = (nodeId: string, updates: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...updates } }
          : node
      )
    );
  };

  const addTrigger = () => {
    const newTrigger = {
      id: `trigger-${Date.now()}`,
      triggerType: "",
      triggerTerm: "",
      platform: "",
      event: "",
    };

    updateNodeData("1", {
      triggers: [...(nodes[0].data.triggers || []), newTrigger],
    });
  };

  const updateTrigger = (triggerId: string, field: string, value: string) => {
    updateNodeData("1", {
      triggers: nodes[0].data.triggers.map((trigger: any) =>
        trigger.id === triggerId ? { ...trigger, [field]: value } : trigger
      ),
    });
  };

  const removeTrigger = (triggerId: string) => {
    updateNodeData("1", {
      triggers: nodes[0].data.triggers.filter((trigger: any) => trigger.id !== triggerId),
    });
  };

  const nodeTypes = {
    start: (props: any) => (
      <StartNode
        {...props}
        isTimeSettingsOpen={isTimeSettingsOpen}
        onTimeSettingsToggle={() => setIsTimeSettingsOpen(!isTimeSettingsOpen)}
        onTimeChange={(value) => updateNodeData("1", { time: value })}
        onAddTrigger={addTrigger}
        onUpdateTrigger={updateTrigger}
        onRemoveTrigger={removeTrigger}
      />
    ),
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
              <Switch checked={isActive} onCheckedChange={setIsActive} />
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
            nodesDraggable={true}
            nodesConnectable={true}
            nodesFocusable={true}
            fitView
          >
            <Background />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}