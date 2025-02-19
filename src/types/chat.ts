export type ChatStatus = 'waiting' | 'offline' | 'online' | 'new' | 'finished' | 'transferred';

export type MessagePriority = 'low' | 'medium' | 'high';

export interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file';
  priority?: MessagePriority;
  tags?: string[];
}

export interface ChatContact {
  id: string;
  name: string;
  status: ChatStatus;
  unreadCount: number;
  isSupport: boolean;
  funnelName?: string;
  avatar?: string;
  lastMessage?: ChatMessage;
  lastSeen?: string;
  responseTime?: number;
  tags?: string[];
}

export interface Department {
  id: number;
  name: string;
  description: string;
  agents: number;
  status: "online" | "offline";
  icon?: string;
}

export interface QuickResponse {
  id: string;
  title: string;
  content: string;
  category: string;
  departmentId?: string;
  tags?: string[];
}
