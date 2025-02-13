
import { BaseEntity } from './chat';

export interface Contact extends BaseEntity {
  phone: string;
  name: string;
  email?: string;
  funnelId: string;
  funnelName: string;
  funnelStatus: 'in_progress' | 'completed';
  tags?: string[];
  lastContactDate?: string;
  nextFollowUp?: string;
  assignedTo?: string;
  department?: string;
  customFields?: Record<string, unknown>;
  source?: string;
  notes?: string[];
}

export interface ContactFilter {
  search?: string;
  funnelId?: string;
  status?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  tags?: string[];
  assignedTo?: string;
  department?: string;
}

export interface ContactSort {
  field: keyof Contact;
  direction: 'asc' | 'desc';
}
