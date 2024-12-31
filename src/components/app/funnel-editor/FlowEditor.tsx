import { ReactFlow, Background, Controls, MiniMap } from "@xyflow/react";
import { Connection, Edge } from "@xyflow/react";
import StartNode from "../nodes/StartNode";
import TextNode from "../nodes/TextNode";

const nodeTypes = {
  start: StartNode,
  text: TextNode,
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
    <div className="flex-1 h-full bg-[#0B0B0F]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="dark"
        minZoom={0.1}
        maxZoom={1.5}
        defaultEdgeOptions={{
          style: {
            stroke: '#FFB800',
            strokeWidth: 2,
          },
          type: 'smoothstep',
        }}
      >
        <Background color="#1E1E26" gap={16} />
        <Controls className="!bg-[#1E1E26]/80 !backdrop-blur-sm !border-white/10" />
        <MiniMap
          className="!bg-[#1E1E26]/80 !backdrop-blur-sm !border-white/10"
          nodeColor="#FFB800"
          maskColor="rgba(0, 0, 0, 0.2)"
        />
      </ReactFlow>
    </div>
  );
}