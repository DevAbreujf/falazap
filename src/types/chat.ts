export interface Department {
  id: string;
  name: string;
  description: string;
}

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
  status: 'online' | 'offline' | 'new' | 'waiting' | 'finished';
  unreadCount: number;
  isSupport: boolean;
  funnelName?: string;
  avatar?: string;
  lastMessage?: ChatMessage;
}