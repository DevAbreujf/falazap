export interface Department {
  id: string;
  name: string;
  description?: string;
  users?: Array<{
    id: string;
    name: string;
    email: string;
    department: string;
  }>;
}

export interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file' | 'note';
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

export interface DepartmentUser {
  id: string;
  name: string;
  email: string;
  department: string;
}