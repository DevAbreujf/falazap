import { Node } from "@xyflow/react";

export interface FlowNode extends Node {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: NodeData;
}

export interface NodeData {
  [key: string]: any; // This adds the index signature that TypeScript requires
  label?: string;
  triggers?: any[];
  delay?: {
    value: number;
    unit: string;
  };
  text?: string;
  audioUrl?: string;
  videoUrl?: string;
  fileName?: string;
}