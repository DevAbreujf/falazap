export interface Schedule {
  id: string;
  reminderName: string;
  clientName: string;
  date: Date;
  time: string;
  phone: string;
  attachment?: File | null;
}