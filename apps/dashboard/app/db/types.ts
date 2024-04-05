import type { ColumnType } from 'kysely';

import type { ReportType } from './enums';

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type MetricData = {
  id: Generated<number>;
  report_id: number;
  performance_metric_id: number;
  value: number;
  unit: string;
  displayValue: string;
  score: Generated<number>;
};
export type PerformanceMetric = {
  id: Generated<number>;
  name: string;
};
export type Report = {
  id: Generated<number>;
  created_at: Generated<Timestamp | null>;
  url: string;
  type: ReportType;
};
export type DB = {
  MetricData: MetricData;
  PerformanceMetric: PerformanceMetric;
  Report: Report;
};
