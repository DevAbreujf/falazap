export type ChatStatus = 'waiting' | 'offline' | 'online' | 'new' | 'finished' | 'transferred';

export interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file';
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
}

export interface Department {
  id: string;
  name: string;
  description?: string;
}