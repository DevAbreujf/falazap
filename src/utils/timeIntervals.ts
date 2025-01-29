export interface TimeInterval {
  id: string;
  start: string;
  end: string;
}

export const DEFAULT_INTERVALS: TimeInterval[] = [
  { id: '1', start: '07:00', end: '18:00' },
  { id: '2', start: '18:00', end: '07:00' }
];

export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60) % 24;
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

export const getDuration = (start: string, end: string): number => {
  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);
  return endMinutes < startMinutes ? 
    (24 * 60) - startMinutes + endMinutes : 
    endMinutes - startMinutes;
};

export const validateIntervalSequence = (intervals: TimeInterval[]): boolean => {
  if (intervals.length < 2) return false;

  // Verifica se cada intervalo começa onde o anterior termina
  for (let i = 0; i < intervals.length; i++) {
    const current = intervals[i];
    const next = intervals[(i + 1) % intervals.length];
    
    if (current.end !== next.start) {
      return false;
    }
  }

  // Verifica se os intervalos cobrem 24 horas
  const totalMinutes = intervals.reduce((total, interval) => {
    return total + getDuration(interval.start, interval.end);
  }, 0);

  return totalMinutes === 24 * 60;
};

export const splitInterval = (
  intervals: TimeInterval[],
  intervalId: string,
  splitTime: string
): TimeInterval[] => {
  const intervalIndex = intervals.findIndex(i => i.id === intervalId);
  if (intervalIndex === -1) return intervals;

  const interval = intervals[intervalIndex];
  const newId = (Math.max(...intervals.map(i => parseInt(i.id))) + 1).toString();

  // Mantém o intervalo original com o novo horário final
  const updatedIntervals = intervals.map(i => {
    if (i.id === intervalId) {
      return { ...i, end: splitTime };
    }
    return i;
  });

  // Adiciona o novo intervalo após o original
  const newInterval = { id: newId, start: splitTime, end: interval.end };
  updatedIntervals.splice(intervalIndex + 1, 0, newInterval);

  return validateIntervalSequence(updatedIntervals) ? updatedIntervals : intervals;
};

export const mergeIntervals = (
  intervals: TimeInterval[],
  removedId: string
): TimeInterval[] => {
  const removedIndex = intervals.findIndex(i => i.id === removedId);
  if (removedIndex === -1) return intervals;

  const previousInterval = intervals[removedIndex - 1];
  const removedInterval = intervals[removedIndex];

  // Se houver um intervalo anterior, ajusta seu horário final
  if (previousInterval) {
    const updatedIntervals = intervals.map(i => {
      if (i.id === previousInterval.id) {
        return { ...i, end: removedInterval.end };
      }
      return i;
    });

    // Remove o intervalo
    const filteredIntervals = updatedIntervals.filter(i => i.id !== removedId);

    return validateIntervalSequence(filteredIntervals) ? filteredIntervals : intervals;
  }

  return intervals;
};