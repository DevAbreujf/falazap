import { useCallback, useState } from "react";
import { ReactFlow, Background, useNodesState, useEdgesState, addEdge, Edge, useReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { StartNode } from "./nodes/StartNode";
import { TextNode } from "./nodes/TextNode";
import { VideoNode } from "./nodes/VideoNode";
import { AudioNode } from "./nodes/AudioNode";
import { FileNode } from "./nodes/FileNode";
import { PathsNode } from "./nodes/PathsNode";
import { FormNode } from "./nodes/FormNode";
import { DelayNode } from "./nodes/DelayNode";
import { QuestionNode } from "./nodes/QuestionNode";
import { TagsNode } from "./nodes/TagsNode";
import { ForwardingNode } from "./nodes/ForwardingNode";
import { ScheduleNode } from "./nodes/ScheduleNode";
import { WeekdaysNode } from "./nodes/WeekdaysNode";
import { TransferDepartmentNode } from "./nodes/TransferDepartmentNode";
import { RequestRatingNode } from "./nodes/RequestRatingNode";
import { TransferAgentNode } from "./nodes/TransferAgentNode";
import { EditTagsNode } from "./nodes/EditTagsNode";
import { NotifyAgentNode } from "./nodes/NotifyAgentNode";
import { EndChatNode } from "./nodes/EndChatNode";

const nodeTypes = {
  start: StartNode,
  text: TextNode,
  video: VideoNode,
  audio: AudioNode,
  file: FileNode,
  paths: PathsNode,
  form: FormNode,
  delay: DelayNode,
  question: QuestionNode,
  tags: TagsNode,
  forwarding: ForwardingNode,
  schedule: ScheduleNode,
  weekdays: WeekdaysNode,
  transferDepartment: TransferDepartmentNode,
  requestRating: RequestRatingNode,
  transferAgent: TransferAgentNode,
  editTags: EditTagsNode,
  notifyAgent: NotifyAgentNode,
  endChat: EndChatNode,
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
    deletable: false,
  },
];

const edgeStyles = {
  default: {},
  hover: { stroke: '#ff0000', strokeWidth: 2 },
};

export function FunnelEditorCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [showRemoveMessage, setShowRemoveMessage] = useState(false);
  const { project } = useReactFlow();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onEdgeMouseEnter = useCallback(() => {
    setShowRemoveMessage(true);
  }, []);

  const onEdgeMouseLeave = useCallback(() => {
    setShowRemoveMessage(false);
  }, []);

  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    setEdges((edges) => edges.filter((e) => e.id !== edge.id));
    setShowRemoveMessage(false);
  }, [setEdges]);

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

      // Obtém a posição do ReactFlow element
      const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
      
      if (!reactFlowBounds) return;

      // Calcula a posição relativa do mouse considerando scroll e zoom
      const position = project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position,
        data: {
          label: `${type} node`,
          triggers: [],
          delay: {
            value: 0,
            unit: "seconds",
          },
          ...(type === 'weekdays' && {
            days: [
              { day: 'Segunda', enabled: true },
              { day: 'Terça', enabled: true },
              { day: 'Quarta', enabled: true },
              { day: 'Quinta', enabled: true },
              { day: 'Sexta', enabled: true },
              { day: 'Sábado', enabled: false },
              { day: 'Domingo', enabled: false },
            ]
          })
        },
        deletable: type !== "start",
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes, project],
  );

  return (
    <div className="absolute inset-0">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        onEdgeMouseEnter={onEdgeMouseEnter}
        onEdgeMouseLeave={onEdgeMouseLeave}
        onEdgeClick={onEdgeClick}
        edgeTypes={{}}
        defaultEdgeOptions={{
          style: edgeStyles.default,
          className: 'custom-edge'
        }}
        fitView
      >
        <Background gap={24} size={1} />
        {showRemoveMessage && (
          <div 
            className="absolute left-1/2 bottom-24 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            Clique na linha para remover esta conexão
          </div>
        )}
      </ReactFlow>
    </div>
  );
}