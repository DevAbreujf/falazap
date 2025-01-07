export interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'file';
  fileUrl?: string;
}

export interface ChatContact {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline';
  lastMessage?: ChatMessage;
  unreadCount: number;
  isSupport?: boolean;
  priority?: 'high' | 'medium' | 'low';
}