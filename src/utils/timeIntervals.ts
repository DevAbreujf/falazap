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
    const start = timeToMinutes(interval.start);
    const end = timeToMinutes(interval.end);
    const duration = end < start ? (24 * 60 - start) + end : end - start;
    return total + duration;
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

  const newIntervals = [
    ...intervals.slice(0, intervalIndex),
    { ...interval, end: splitTime },
    { id: newId, start: splitTime, end: interval.end },
    ...intervals.slice(intervalIndex + 1)
  ];

  return validateIntervalSequence(newIntervals) ? newIntervals : intervals;
};