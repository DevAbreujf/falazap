export interface Contact {
  id: number;
  phone: string;
  name: string;
  date: string;
  funnelName: string;
  funnelStatus: 'in_progress' | 'completed';
}