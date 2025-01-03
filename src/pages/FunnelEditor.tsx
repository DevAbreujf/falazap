import { useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import { TextNode } from "@/components/flow-nodes/TextNode";
import { AudioNode } from "@/components/flow-nodes/AudioNode";
import { VideoNode } from "@/components/flow-nodes/VideoNode";
import { FileNode } from "@/components/flow-nodes/FileNode";
import { StartNode } from "@/components/flow-nodes/StartNode";
import { PathNode } from "@/components/flow-nodes/PathNode";
import { FlowNode, NodeData } from "@/types/flow";
import { ElementsSidebar } from "@/components/funnel-editor/ElementsSidebar";
import { EditorHeader } from "@/components/funnel-editor/EditorHeader";
import { ManualTriggerDialog } from "@/components/funnel-editor/ManualTriggerDialog";

const nodeTypes = {
  textNode: TextNode,
  audioNode: AudioNode,
  videoNode: VideoNode,
  fileNode: FileNode,
  startNode: StartNode,
  pathNode: PathNode,
};

const initialNodes: FlowNode[] = [
  {
    id: "start",
    type: "startNode",
    position: { x: 400, y: 100 },
    data: { 
      label: "Início",
      triggers: [],
      delay: {
        value: 0,
        unit: "minutes"
      }
    }
  }
];

export default function FunnelEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isActive, setIsActive] = useState(false);
  const [funnelName, setFunnelName] = useState("Novo Funil");
  const [isEditing, setIsEditing] = useState(false);
  const [isManualTriggerOpen, setIsManualTriggerOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+55");
  const [selectedTrigger, setSelectedTrigger] = useState("");

  const handleManualTrigger = () => {
    setIsManualTriggerOpen(false);
  };

  const handleSave = () => {
    console.log("Salvando funil...");
  };

  const handleExport = () => {
    const funnelData = {
      nodes,
      edges,
      name: funnelName,
      isActive
    };
    const jsonString = JSON.stringify(funnelData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${funnelName.toLowerCase().replace(/\s+/g, "-")}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          setNodes(importedData.nodes);
          setEdges(importedData.edges);
          setFunnelName(importedData.name);
          setIsActive(importedData.isActive);
        } catch (error) {
          console.error("Erro ao importar funil:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const getNodeData = (type: string): NodeData => {
    switch (type) {
      case "textNode":
        return { text: "" };
      case "audioNode":
        return { audioUrl: "" };
      case "videoNode":
        return { videoUrl: "" };
      case "fileNode":
        return { fileName: "" };
      case "pathNode":
        return { rules: [], hasDefaultPath: false };
      default:
        return {};
    }
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("application/reactflow");
    if (!type) return;

    const position = {
      x: event.clientX - 200,
      y: event.clientY - 100,
    };

    const newNode: FlowNode = {
      id: `${type}-${nodes.length + 1}`,
      type,
      position,
      data: getNodeData(type),
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="h-screen flex flex-col">
      <EditorHeader
        funnelName={funnelName}
        isEditing={isEditing}
        isActive={isActive}
        setFunnelName={setFunnelName}
        setIsEditing={setIsEditing}
        setIsActive={setIsActive}
        setIsManualTriggerOpen={setIsManualTriggerOpen}
        handleSave={handleSave}
        handleExport={handleExport}
        handleImport={handleImport}
      />

      <div className="flex-1 bg-zinc-50 flex">
        <ElementsSidebar onDragStart={onDragStart} />

        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>

      <ManualTriggerDialog
        isOpen={isManualTriggerOpen}
        setIsOpen={setIsManualTriggerOpen}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        selectedTrigger={selectedTrigger}
        setSelectedTrigger={setSelectedTrigger}
        handleManualTrigger={handleManualTrigger}
      />
    </div>
  );
}