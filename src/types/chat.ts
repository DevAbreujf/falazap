
export type ChatStatus = 'waiting' | 'offline' | 'online' | 'new' | 'finished' | 'transferred';

export type MessagePriority = 'low' | 'medium' | 'high';

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  isDeleted?: boolean;
}

export interface ChatMessage extends BaseEntity {
  content: string;
  senderId: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file';
  priority?: MessagePriority;
  tags?: string[];
  chatId: string;
  departmentId: string;
}

export interface ChatContact extends BaseEntity {
  name: string;
  status: ChatStatus;
  unreadCount: number;
  isSupport: boolean;
  funnelId: string;
  funnelName?: string;
  avatar?: string;
  lastMessage?: ChatMessage;
  lastSeen?: string;
  responseTime?: number;
  tags?: string[];
  departmentId: string;
  assignedTo?: string;
  phone: string;
  email?: string;
}

export interface Department extends BaseEntity {
  name: string;
  description?: string;
  color?: string;
  parentId?: string;
  order?: number;
}

export interface QuickResponse extends BaseEntity {
  title: string;
  content: string;
  category: string;
  departmentId?: string;
  tags?: string[];
  usageCount?: number;
}

export interface APIResponse<T> {
  data: T;
  metadata: {
    page?: number;
    limit?: number;
    total?: number;
    hasMore?: boolean;
  };
}

export interface APIError {
  code: string;
  message: string;
  details?: unknown;
}
