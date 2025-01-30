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
  const normalizedMinutes = minutes % (24 * 60);
  const hours = Math.floor(normalizedMinutes / 60);
  const mins = normalizedMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

export const getDuration = (start: string, end: string): number => {
  let startMinutes = timeToMinutes(start);
  let endMinutes = timeToMinutes(end);
  
  if (endMinutes <= startMinutes) {
    endMinutes += 24 * 60; // Adiciona 24 horas em minutos
  }
  
  return endMinutes - startMinutes;
};

export const validateIntervalSequence = (intervals: TimeInterval[]): boolean => {
  if (intervals.length < 2) return false;

  // Pega o horário inicial do primeiro intervalo
  const firstStart = intervals[0].start;
  let lastEnd = intervals[0].end;

  // Verifica se cada intervalo começa onde o anterior termina
  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    if (current.start !== lastEnd) {
      return false;
    }
    lastEnd = current.end;
  }

  // O último intervalo deve terminar no horário inicial do primeiro
  return lastEnd === firstStart;
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

  // Cria os dois novos intervalos
  const firstHalf = { ...interval, end: splitTime };
  const secondHalf = { id: newId, start: splitTime, end: interval.end };

  // Substitui o intervalo original pelos dois novos
  const newIntervals = [
    ...intervals.slice(0, intervalIndex),
    firstHalf,
    secondHalf,
    ...intervals.slice(intervalIndex + 1)
  ];

  return validateIntervalSequence(newIntervals) ? newIntervals : intervals;
};

export const mergeIntervals = (
  intervals: TimeInterval[],
  removedId: string
): TimeInterval[] => {
  const removedIndex = intervals.findIndex(i => i.id === removedId);
  if (removedIndex === -1) return intervals;

  // Se for o último intervalo, ajusta o anterior
  if (removedIndex === intervals.length - 1) {
    const newIntervals = [...intervals];
    newIntervals[removedIndex - 1].end = intervals[0].start;
    return newIntervals.filter(i => i.id !== removedId);
  }

  // Se for um intervalo intermediário, une com o próximo
  const updatedIntervals = intervals.map((interval, index) => {
    if (index === removedIndex - 1) {
      return { ...interval, end: intervals[removedIndex + 1].end };
    }
    return interval;
  }).filter((_, index) => index !== removedIndex && index !== removedIndex + 1);

  return validateIntervalSequence(updatedIntervals) ? updatedIntervals : intervals;
};