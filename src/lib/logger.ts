
type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  details?: unknown;
  timestamp: string;
  userId?: string;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  private readonly maxLogs = 1000;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private addLog(level: LogLevel, message: string, details?: unknown) {
    const log: LogEntry = {
      level,
      message,
      details,
      timestamp: new Date().toISOString(),
      userId: localStorage.getItem('userId') || undefined,
    };

    this.logs.unshift(log);
    
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`[${level.toUpperCase()}] ${message}`, details || '');
    }

    // Aqui podemos implementar o envio dos logs para um serviço de monitoramento
  }

  info(message: string, details?: unknown) {
    this.addLog('info', message, details);
  }

  warn(message: string, details?: unknown) {
    this.addLog('warn', message, details);
  }

  error(message: string, details?: unknown) {
    this.addLog('error', message, details);
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }
}

export const logger = Logger.getInstance();
