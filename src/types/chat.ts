export interface ChatContact {
  id: string;
  name: string;
  status: 'online' | 'offline';
  avatar?: string;
  unreadCount: number;
  isSupport?: boolean;
  lastMessage?: {
    id: string;
    content: string;
    senderId: string;
    timestamp: string;
    status: 'sent' | 'delivered' | 'read';
    type: 'text' | 'file';
  };
}

export interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'file';
}

export interface Department {
  id: string;
  name: string;
  description: string;
}