export interface MetricData {
  name: string;
  id: number;
  unit: string;
  value: number;
  displayValue: string;
}

export interface Reports {
  id: number;
  created_at: string | null;
  metricData: MetricData[];
}
