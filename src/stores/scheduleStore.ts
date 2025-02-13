
import { create } from 'zustand';
import { Schedule, ScheduleFilter } from '@/types/schedule';

interface ScheduleStore {
  schedules: Schedule[];
  filters: ScheduleFilter;
  loading: boolean;
  error: string | null;
  setSchedules: (schedules: Schedule[]) => void;
  addSchedule: (schedule: Schedule) => void;
  updateSchedule: (id: string, data: Partial<Schedule>) => void;
  removeSchedule: (id: string) => void;
  setFilters: (filters: ScheduleFilter) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useScheduleStore = create<ScheduleStore>((set) => ({
  schedules: [],
  filters: {},
  loading: false,
  error: null,
  setSchedules: (schedules) => set({ schedules }),
  addSchedule: (schedule) =>
    set((state) => ({
      schedules: [...state.schedules, schedule],
    })),
  updateSchedule: (id, data) =>
    set((state) => ({
      schedules: state.schedules.map((schedule) =>
        schedule.id === id ? { ...schedule, ...data } : schedule
      ),
    })),
  removeSchedule: (id) =>
    set((state) => ({
      schedules: state.schedules.filter((schedule) => schedule.id !== id),
    })),
  setFilters: (filters) => set({ filters }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
