import { Node } from "@xyflow/react";

export interface BaseNodeData {
  label?: string;
  [key: string]: unknown;
}

export interface StartNodeData extends BaseNodeData {
  triggers: Array<{
    id: string;
    triggerType: "contains" | "exact" | "any" | "integration";
    triggerTerm?: string;
    platform?: "kiwify" | "hotmart";
    event?: "abandoned" | "approved";
  }>;
  delay: {
    value: number;
    unit: "seconds" | "minutes" | "hours";
  };
}

export interface TextNodeData extends BaseNodeData {
  content: string;
}

export interface VideoNodeData extends BaseNodeData {
  videoUrl?: string;
  actionType?: "click" | "auto";
  actionLabel?: string;
}

export interface AudioNodeData extends BaseNodeData {
  audioUrl?: string;
}

export interface FormNodeData extends BaseNodeData {
  fields: Array<{
    id: string;
    type: "name" | "email" | "phone";
    required: boolean;
  }>;
}

export interface ConditionData extends BaseNodeData {
  conditions: Array<{
    id: string;
    variable: string;
    operator: "equals" | "contains" | "greater" | "less";
    value: string;
  }>;
}

export interface DelayNodeData extends BaseNodeData {
  seconds: number;
}

export interface QuestionNodeData extends BaseNodeData {
  question: string;
  variableName: string;
}

export interface TagsNodeData extends BaseNodeData {
  tags: string[];
}

export type NodeData = 
  | StartNodeData 
  | TextNodeData 
  | VideoNodeData 
  | AudioNodeData 
  | FormNodeData 
  | ConditionData 
  | DelayNodeData 
  | QuestionNodeData 
  | TagsNodeData;

export interface FlowNode extends Node {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: NodeData;
}