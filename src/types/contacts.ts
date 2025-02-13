
export interface Contact {
  id: string;
  name: string;
  email?: string;
  phone: string;
  createdAt: string;
  funnelId?: string;
  funnelName?: string;
  funnelStatus: 'completed' | 'in_progress';
  departmentId?: string;
  tags?: string[];
}

export interface ContactFilter {
  search?: string;
  funnelId?: string;
  status?: string;
  departmentId?: string;
  tags?: string[];
}

export interface ContactSort {
  field: keyof Contact;
  direction: 'asc' | 'desc';
}
