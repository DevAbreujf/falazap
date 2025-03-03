
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
  if (!time || time.length !== 5) return 0;
  const [hours, minutes] = time.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) return 0;
  return hours * 60 + minutes;
};

export const minutesToTime = (minutes: number): string => {
  if (isNaN(minutes)) return '00:00';
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

  // Verifica se todos os horários são válidos
  const isValidTime = (time: string) => {
    return /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(time);
  };

  for (const interval of intervals) {
    if (!isValidTime(interval.start) || !isValidTime(interval.end)) {
      return false;
    }
  }

  // Verifica a sequência dos intervalos
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
  
  // Valida o formato do horário
  if (!/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(splitTime)) {
    return intervals;
  }

  const startMinutes = timeToMinutes(interval.start);
  const endMinutes = timeToMinutes(interval.end);
  const splitMinutes = timeToMinutes(splitTime);

  // Verifica se o horário de divisão é válido
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

  const firstHalf = { ...interval, end: minutesToTime(splitMinutes) };
  const secondHalf = { 
    id: newId, 
    start: minutesToTime(splitMinutes), 
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

  // Remove o intervalo
  const newIntervals = [...intervals];
  newIntervals.splice(removedIndex, 1);

  // Pega o horário inicial do primeiro intervalo como referência
  const firstStart = timeToMinutes(newIntervals[0].start);
  
  // Calcula a duração total disponível (24 horas)
  const totalMinutes = 24 * 60;
  
  // Distribui o tempo igualmente entre os intervalos restantes
  const minutesPerInterval = Math.floor(totalMinutes / newIntervals.length);
  
  // Ajusta os horários mantendo o horário inicial do primeiro intervalo
  for (let i = 0; i < newIntervals.length; i++) {
    const startMinute = (firstStart + (i * minutesPerInterval)) % (24 * 60);
    const endMinute = (firstStart + ((i + 1) * minutesPerInterval)) % (24 * 60);
    
    newIntervals[i] = {
      ...newIntervals[i],
      start: minutesToTime(startMinute),
      end: i < newIntervals.length - 1 ? minutesToTime(endMinute) : newIntervals[0].start
    };
  }

  return newIntervals;
};
