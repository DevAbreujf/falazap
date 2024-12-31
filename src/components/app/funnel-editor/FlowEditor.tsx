import { ReactFlow, Background, Controls, MiniMap } from "@xyflow/react";
import { Connection, Edge } from "@xyflow/react";
import StartNode from "../nodes/StartNode";
import TextNode from "../nodes/TextNode";
import ImageNode from "../nodes/ImageNode";
import AudioNode from "../nodes/AudioNode";
import VideoNode from "../nodes/VideoNode";
import DocumentNode from "../nodes/DocumentNode";
import PathNode from "../nodes/PathNode";
import WaitNode from "../nodes/WaitNode";
import AskNode from "../nodes/AskNode";
import TagNode from "../nodes/TagNode";
import VariableNode from "../nodes/VariableNode";

const nodeTypes = {
  start: StartNode,
  text: TextNode,
  image: ImageNode,
  audio: AudioNode,
  video: VideoNode,
  document: DocumentNode,
  path: PathNode,
  wait: WaitNode,
  ask: AskNode,
  tag: TagNode,
  variable: VariableNode,
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
        minZoom={0.1}
        maxZoom={1.5}
        defaultEdgeOptions={{
          style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
          type: 'smoothstep',
        }}
      >
        <Background color="#333" gap={16} />
        <Controls className="!bg-black/20 !backdrop-blur-sm !border-white/10" />
        <MiniMap
          className="!bg-black/20 !backdrop-blur-sm !border-white/10"
          nodeColor="#666"
          maskColor="rgba(0, 0, 0, 0.2)"
        />
      </ReactFlow>
    </div>
  );
}