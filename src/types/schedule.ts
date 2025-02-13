
import { BaseEntity } from './chat';

export interface Schedule extends BaseEntity {
  reminderName: string;
  clientName: string;
  date: Date;
  time: string;
  phone: string;
  contactId: string;
  departmentId?: string;
  assignedTo?: string;
  status: 'pending' | 'completed' | 'cancelled';
  notes?: string;
  attachment?: {
    id: string;
    name: string;
    type: string;
    url: string;
    size: number;
  } | null;
  notificationsSent?: {
    type: 'email' | 'sms' | 'whatsapp';
    timestamp: string;
    status: 'success' | 'failed';
  }[];
  recurrence?: {
    type: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: Date;
  };
}

export interface ScheduleFilter {
  search?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  status?: Schedule['status'];
  assignedTo?: string;
  departmentId?: string;
}
