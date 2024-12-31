import { useCallback } from "react";
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

import { StartNode } from "@/components/app/nodes/StartNode";
import { TextNode } from "@/components/app/nodes/TextNode";

const nodeTypes = {
  start: StartNode,
  text: TextNode,
};

const initialNodes = [
  {
    id: "start",
    type: "start",
    position: { x: 400, y: 100 },
    data: {},
  },
];

export function FlowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="flex-1 bg-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        className="dark"
        fitView
      >
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>
    </div>
  );
}