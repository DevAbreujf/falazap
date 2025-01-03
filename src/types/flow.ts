export interface FlowNode {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: NodeData;
}

export interface NodeData {
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