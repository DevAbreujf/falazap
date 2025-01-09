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

export interface Trigger {
  id: string;
  triggerType: "contains" | "exact" | "any" | "integration";
  triggerTerm?: string;
  platform?: "kiwify" | "hotmart";
  event?: "abandoned" | "approved";
}

export interface Path {
  id: string;
  term: string;
  condition: "exact" | "contains";
}

export interface PathsNodeData extends BaseNodeData {
  variable: string;
  paths: Path[];
  fallback?: boolean;
}

export interface ScheduleNodeData extends BaseNodeData {
  timezone: string;
  intervals: Array<{
    start: string;
    end: string;
  }>;
}

export interface WeekdaysNodeData extends BaseNodeData {
  days: Array<{
    day: string;
    enabled: boolean;
    schedule?: {
      start: string;
      end: string;
    };
  }>;
}

export interface TransferDepartmentNodeData extends BaseNodeData {
  rule: 'specific' | 'previous';
  department?: string;
  requirePermission: boolean;
  activateFailureFlow: boolean;
}

export interface RequestRatingNodeData extends BaseNodeData {
  message: string;
  showAsMenu: boolean;
  activateInvalidFlow: boolean;
  activateNoResponseFlow: boolean;
}

export interface TransferAgentNodeData extends BaseNodeData {
  agent?: string;
  onlyIfAvailable: boolean;
  activateFailureFlow: boolean;
}

export interface EditTagsNodeData extends BaseNodeData {
  action: "add" | "remove";
  tags: string[];
}

export interface NotifyAgentNodeData extends BaseNodeData {
  title: string;
  message: string;
  rule: "current" | "specific";
  agent?: string;
  onlyIfAvailable: boolean;
}

export interface EndChatNodeData extends BaseNodeData {
  closedBy: "system" | "agent" | "user" | "none";
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
  | TagsNodeData 
  | PathsNodeData
  | ScheduleNodeData
  | WeekdaysNodeData
  | TransferDepartmentNodeData
  | RequestRatingNodeData
  | TransferAgentNodeData
  | EditTagsNodeData
  | NotifyAgentNodeData
  | EndChatNodeData;

export interface FlowNode extends Node {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: NodeData;
}
