import type { Result } from 'lighthouse';

export const performanceMetricsData = [
  { id: 1, name: 'first-contentful-paint' },
  { id: 2, name: 'largest-contentful-paint' },
  { id: 3, name: 'first-meaningful-paint' },
  { id: 4, name: 'total-blocking-time' },
  { id: 5, name: 'cumulative-layout-shift' },
  { id: 6, name: 'speed-index' },
];

type Value = { id?: number; actualValue: number; displayValue: string; unit: string };
type PerformanceResult = Value[];

export const getPerformanceMetricId = (metricName: string): number | undefined => {
  const metric = performanceMetricsData.find((metric) => metric.name === metricName);
  return metric ? metric.id : undefined;
};

const getData = (result: Result, key: string): Value => {
  const { numericUnit = '', numericValue = 0, displayValue = '' } = result.audits[key] ?? {};
  const id = getPerformanceMetricId(key);

  return { id, actualValue: numericValue, displayValue, unit: numericUnit };
};

const performanceKeys = performanceMetricsData.map((metric) => metric.name);

/** Extracts performance-related data from a Lighthouse audit result object. */
export const getPerformanceAudits = (lighthouseResult: Result): PerformanceResult => {
  const result: PerformanceResult = [];

  for (const key of performanceKeys) {
    result.push(getData(lighthouseResult, key));
  }

  return result;
};
