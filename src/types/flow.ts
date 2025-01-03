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

interface PathCondition {
  term: string;
  type: "exact" | "contains";
}

interface PathRule {
  variable: string;
  conditions: PathCondition[];
}

export interface NodeData {
  [key: string]: any;
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
  rules?: PathRule[];
  hasDefaultPath?: boolean;
}