
import { useEffect, useCallback } from 'react';
import { logger } from '@/lib/logger';

interface PerformanceMetrics {
  FCP: number | null;
  LCP: number | null;
  FID: number | null;
  CLS: number | null;
}

export function PerformanceMonitor() {
  const metrics: PerformanceMetrics = {
    FCP: null,
    LCP: null,
    FID: null,
    CLS: null,
  };

  const reportMetric = useCallback((name: string, value: number) => {
    logger.info(`Performance Metric: ${name}`, { value });
  }, []);

  useEffect(() => {
    // First Contentful Paint
    const paintObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          metrics.FCP = entry.startTime;
          reportMetric('FCP', entry.startTime);
        }
      }
    });

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      metrics.LCP = lastEntry.startTime;
      reportMetric('LCP', lastEntry.startTime);
    });

    // First Input Delay
    const fidObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry instanceof PerformanceEventTiming) {
          metrics.FID = entry.processingStart - entry.startTime;
          reportMetric('FID', metrics.FID);
        }
      }
    });

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((entryList) => {
      let clsValue = 0;
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      metrics.CLS = clsValue;
      reportMetric('CLS', clsValue);
    });

    try {
      paintObserver.observe({ entryTypes: ['paint'] });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      fidObserver.observe({ entryTypes: ['first-input'] });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      logger.error('Failed to initialize performance monitoring', error);
    }

    return () => {
      paintObserver.disconnect();
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, [reportMetric]);

  return null;
}
