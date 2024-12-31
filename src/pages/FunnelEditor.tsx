import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Connection, Edge } from "@xyflow/react";
import { useNodesState, useEdgesState, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { EditorHeader } from "@/components/app/funnel-editor/EditorHeader";
import { EditorSidebar } from "@/components/app/funnel-editor/EditorSidebar";
import { FlowEditor } from "@/components/app/funnel-editor/FlowEditor";

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

  const updateNodeData = useCallback((nodeId: string, updates: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              ...updates,
            },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  const handleConditionChange = (value: string) => {
    updateNodeData("inicio", { condition: value });
  };

  const handleTermChange = (value: string) => {
    updateNodeData("inicio", { term: value });
  };

  const handleTimeValueChange = (value: number) => {
    updateNodeData("inicio", { timeValue: value });
  };

  const handleTimeUnitChange = (value: "seconds" | "minutes" | "hours") => {
    updateNodeData("inicio", { timeUnit: value });
  };

  useState(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "inicio") {
          return {
            ...node,
            data: {
              ...node.data,
              onConditionChange: handleConditionChange,
              onTermChange: handleTermChange,
              onTimeValueChange: handleTimeValueChange,
              onTimeUnitChange: handleTimeUnitChange,
            },
          };
        }
        return node;
      })
    );
  });

  const handleSave = () => {
    console.log("Saving funnel:", { title: funnelTitle, nodes, edges });
    navigate("/funnels");
  };

  return (
    <div className="flex flex-col w-full h-screen bg-background">
      <EditorHeader
        funnelTitle={funnelTitle}
        setFunnelTitle={setFunnelTitle}
        onSave={handleSave}
      />
      <div className="flex h-[calc(100vh-73px)]">
        <EditorSidebar />
        <FlowEditor
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        />
      </div>
    </div>
  );
}