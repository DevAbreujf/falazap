import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Node,
  NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Zap, Save, Upload, Download } from "lucide-react";
import { ElementsSidebar } from "@/components/funnel-editor/ElementsSidebar";
import { StartNode } from "@/components/funnel-editor/nodes/StartNode";
import { TextNode } from "@/components/funnel-editor/nodes/TextNode";

type CustomNode = Node<{
  label?: string;
  description?: string;
  time?: number;
  triggers?: Array<{
    id: string;
    triggerType: string;
    triggerTerm: string;
    platform: string;
    event: string;
  }>;
  content?: string;
}>;

const initialNodes: CustomNode[] = [
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
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isActive, setIsActive] = useState(false);
  const [isTimeSettingsOpen, setIsTimeSettingsOpen] = useState(false);

  const onConnect = (params: Connection) => setEdges((eds) => addEdge(params, eds));

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();

    const type = event.dataTransfer.getData('application/reactflow');

    if (typeof type === 'undefined' || !type) {
      return;
    }

    const position = {
      x: event.clientX - 280,
      y: event.clientY - 100,
    };

    const newNode: CustomNode = {
      id: `${type}-${Date.now()}`,
      type,
      position,
      data: { content: '' },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  const handleTimeSettingsToggle = () => setIsTimeSettingsOpen(!isTimeSettingsOpen);
  const handleTimeChange = (time: number) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === "1" ? { ...node, data: { ...node.data, time } } : node
      )
    );
  };

  const handleAddTrigger = () => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "1") {
          const newTrigger = {
            id: `trigger-${Date.now()}`,
            triggerType: "",
            triggerTerm: "",
            platform: "",
            event: "",
          };
          return {
            ...node,
            data: {
              ...node.data,
              triggers: [...(node.data.triggers || []), newTrigger],
            },
          };
        }
        return node;
      })
    );
  };

  const handleUpdateTrigger = (triggerId: string, field: string, value: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "1" && node.data.triggers) {
          const updatedTriggers = node.data.triggers.map((trigger) =>
            trigger.id === triggerId ? { ...trigger, [field]: value } : trigger
          );
          return { ...node, data: { ...node.data, triggers: updatedTriggers } };
        }
        return node;
      })
    );
  };

  const handleRemoveTrigger = (triggerId: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "1" && node.data.triggers) {
          const updatedTriggers = node.data.triggers.filter(
            (trigger) => trigger.id !== triggerId
          );
          return { ...node, data: { ...node.data, triggers: updatedTriggers } };
        }
        return node;
      })
    );
  };

  const nodeTypes = {
    start: (props: any) => (
      <StartNode
        {...props}
        isTimeSettingsOpen={isTimeSettingsOpen}
        onTimeSettingsToggle={handleTimeSettingsToggle}
        onTimeChange={handleTimeChange}
        onAddTrigger={handleAddTrigger}
        onUpdateTrigger={handleUpdateTrigger}
        onRemoveTrigger={handleRemoveTrigger}
      />
    ),
    text: TextNode,
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
            onDragOver={onDragOver}
            onDrop={onDrop}
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