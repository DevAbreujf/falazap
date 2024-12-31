import { ReactFlow, Background, Controls, MiniMap } from "@xyflow/react";
import { Connection, Edge } from "@xyflow/react";
import StartNode from "../nodes/StartNode";

const nodeTypes = {
  start: StartNode,
};

interface FlowEditorProps {
  nodes: any[];
  edges: Edge[];
  onNodesChange: any;
  onEdgesChange: any;
  onConnect: (params: Connection | Edge) => void;
}

export function FlowEditor({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
}: FlowEditorProps) {
  return (
    <div className="flex-1 h-full bg-[#141414]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="dark"
      >
        <Background color="#333" gap={16} />
        <Controls className="!bg-sidebar !border-border/50" />
        <MiniMap
          className="!bg-sidebar !border-border/50"
          nodeColor="#666"
          maskColor="rgba(0, 0, 0, 0.2)"
        />
      </ReactFlow>
    </div>
  );
}