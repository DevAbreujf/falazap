import { create } from 'zustand';
import { Schedule } from '@/types/schedule';

interface ScheduleStore {
  schedules: Schedule[];
  addSchedule: (schedule: Schedule) => void;
  updateSchedule: (id: string, updatedSchedule: Partial<Schedule>) => void;
  deleteSchedule: (id: string) => void;
}

export const useSchedules = create<ScheduleStore>((set) => ({
  schedules: [],
  addSchedule: (schedule) =>
    set((state) => ({
      schedules: [...state.schedules, schedule],
    })),
  updateSchedule: (id, updatedSchedule) =>
    set((state) => ({
      schedules: state.schedules.map((schedule) =>
        schedule.id === id ? { ...schedule, ...updatedSchedule } : schedule
      ),
    })),
  deleteSchedule: (id) =>
    set((state) => ({
      schedules: state.schedules.filter((schedule) => schedule.id !== id),
    })),
}));