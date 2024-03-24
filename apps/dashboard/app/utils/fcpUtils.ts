import type { Reports } from '@/store';

export const getFcpData = (reports: Reports[]) => {
  return reports.map((report) => {
    const { id, created_at, metricData } = report;
    const { unit, value } = metricData[0];

    const date = new Date(created_at!).toLocaleString('en-IN', {
      month: 'short',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      hour12: false,
      minute: '2-digit',
      second: '2-digit',
    });

    return { id, date, FCP: value, unit };
  });
};

export const getStrokeColor = (averageValue: number) => {
  if (averageValue > 3000) return '#FF5555';
  if (averageValue > 1800) return '#FFB86C';
  return '#50FA7B';
};
