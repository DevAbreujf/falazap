import { Node } from "@xyflow/react";

export interface BaseNodeData {
  label?: string;
  [key: string]: unknown;  // Add index signature to make it compatible with Record<string, unknown>
}

export interface StartNodeData extends BaseNodeData {
  triggers: any[];
  delay: {
    value: number;
    unit: string;
  };
}

export interface TextNodeData extends BaseNodeData {
  text: string;
}

export interface AudioNodeData extends BaseNodeData {
  audioUrl?: string;
}

export interface VideoNodeData extends BaseNodeData {
  videoUrl?: string;
}

export interface FileNodeData extends BaseNodeData {
  fileName?: string;
}

export interface PathCondition {
  term: string;
  type: "exact" | "contains";
}

export interface PathRule {
  variable: string;
  conditions: PathCondition[];
}

export interface PathNodeData extends BaseNodeData {
  rules: PathRule[];
  hasDefaultPath: boolean;
}

export type NodeData = StartNodeData | TextNodeData | AudioNodeData | VideoNodeData | FileNodeData | PathNodeData;

export interface FlowNode extends Node {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: NodeData;
}