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
  const normalizedMinutes = ((minutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const hours = Math.floor(normalizedMinutes / 60);
  const mins = normalizedMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

export const getDuration = (start: string, end: string): number => {
  let startMinutes = timeToMinutes(start);
  let endMinutes = timeToMinutes(end);
  
  if (endMinutes <= startMinutes) {
    endMinutes += 24 * 60;
  }
  
  return endMinutes - startMinutes;
};

export const validateIntervalSequence = (intervals: TimeInterval[]): boolean => {
  if (intervals.length < 2) return false;

  for (let i = 0; i < intervals.length - 1; i++) {
    if (intervals[i].end !== intervals[i + 1].start) {
      return false;
    }
  }

  const lastInterval = intervals[intervals.length - 1];
  const firstInterval = intervals[0];
  
  return lastInterval.end === firstInterval.start;
};

export const splitInterval = (
  intervals: TimeInterval[],
  intervalId: string,
  splitTime: string
): TimeInterval[] => {
  const intervalIndex = intervals.findIndex(i => i.id === intervalId);
  if (intervalIndex === -1) return intervals;

  const interval = intervals[intervalIndex];
  const startMinutes = timeToMinutes(interval.start);
  const endMinutes = timeToMinutes(interval.end);
  const splitMinutes = timeToMinutes(splitTime);

  let adjustedSplitMinutes = splitMinutes;
  if (endMinutes <= startMinutes) {
    if (splitMinutes < startMinutes && splitMinutes > endMinutes) {
      return intervals;
    }
  } else {
    if (splitMinutes <= startMinutes || splitMinutes >= endMinutes) {
      return intervals;
    }
  }

  const existingIds = intervals.map(i => parseInt(i.id)).filter(id => !isNaN(id));
  const maxId = Math.max(...existingIds, 2);
  const newId = (maxId + 1).toString();

  const firstHalf = { ...interval, end: minutesToTime(adjustedSplitMinutes) };
  const secondHalf = { 
    id: newId, 
    start: minutesToTime(adjustedSplitMinutes), 
    end: interval.end 
  };

  return [
    ...intervals.slice(0, intervalIndex),
    firstHalf,
    secondHalf,
    ...intervals.slice(intervalIndex + 1)
  ];
};

export const mergeIntervals = (
  intervals: TimeInterval[],
  removedId: string
): TimeInterval[] => {
  const removedIndex = intervals.findIndex(i => i.id === removedId);
  if (removedIndex === -1) return intervals;

  const newIntervals = [...intervals];
  
  // Se não for o último intervalo
  if (removedIndex < intervals.length - 1) {
    // O próximo intervalo herda o início do intervalo removido
    newIntervals[removedIndex + 1].start = intervals[removedIndex].start;
    newIntervals.splice(removedIndex, 1);
  } 
  // Se for o último intervalo
  else {
    // O intervalo anterior herda o fim do intervalo removido
    newIntervals[removedIndex - 1].end = intervals[removedIndex].end;
    newIntervals.splice(removedIndex, 1);
  }

  // Recalcular os horários para manter o ciclo de 24 horas
  for (let i = 0; i < newIntervals.length; i++) {
    const currentInterval = newIntervals[i];
    const nextInterval = newIntervals[(i + 1) % newIntervals.length];
    nextInterval.start = currentInterval.end;
  }

  return validateIntervalSequence(newIntervals) ? newIntervals : intervals;
};