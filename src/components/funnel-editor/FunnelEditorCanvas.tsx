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

import { StartNode } from "./nodes/StartNode";
import { TextNode } from "./nodes/TextNode";
import { VideoNode } from "./nodes/VideoNode";
import { AudioNode } from "./nodes/AudioNode";
import { ConditionNode } from "./nodes/ConditionNode";
import { FormNode } from "./nodes/FormNode";
import { DelayNode } from "./nodes/DelayNode";
import { QuestionNode } from "./nodes/QuestionNode";
import { TagsNode } from "./nodes/TagsNode";

const nodeTypes = {
  start: StartNode,
  text: TextNode,
  video: VideoNode,
  audio: AudioNode,
  condition: ConditionNode,
  form: FormNode,
  delay: DelayNode,
  question: QuestionNode,
  tags: TagsNode,
};

const initialNodes = [
  {
    id: "start",
    type: "start",
    position: { x: 100, y: 100 },
    data: {
      label: "Início",
      triggers: [],
      delay: {
        value: 0,
        unit: "seconds",
      },
    },
  },
];

export function FunnelEditorCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = {
        x: event.clientX - 250,
        y: event.clientY - 100,
      };

      const newNode = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position,
        data: {
          label: `${type} node`,
          ...(type === "start" && {
            triggers: [],
            delay: { value: 0, unit: "seconds" },
          }),
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes],
  );

  return (
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
        fitView
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}