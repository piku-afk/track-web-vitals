import { calculatePercentageDifference } from './filterUtils';
import { prisma } from './prisma.server';

export interface Score {
  id: number;
  unit: string;
  value: number;
  created_at: string | null;
}

interface Stats {
  avg: number;
  min: number;
  max: number;
  score: number;
}

interface MetricData extends Stats {
  data: Score[];
  diff: number;
}

export const fetchMetricData = async (
  reportIds: number[],
  previousReportIds: number[],
  performanceMetricId: number,
): Promise<MetricData> => {
  const data: Score[] = await prisma.metricData
    .findMany({
      orderBy: { Report: { created_at: 'asc' } },
      where: { report_id: { in: reportIds }, performance_metric_id: performanceMetricId },
      select: { id: true, unit: true, value: true, Report: { select: { created_at: true } } },
    })
    .then((data) =>
      data.map(({ Report: { created_at }, id, unit, value }) => {
        const date = created_at
          ? new Date(created_at).toLocaleString('en-IN', {
              dateStyle: 'medium',
            })
          : null;

        return { id, unit, value, created_at: date };
      }),
    );

  const stats: Stats = await prisma.metricData
    .aggregate({
      where: { report_id: { in: reportIds }, performance_metric_id: performanceMetricId },
      _max: { value: true },
      _min: { value: true },
      _avg: { value: true, score: true },
    })
    .then((result) => {
      const { _avg, _max, _min } = result;

      return {
        avg: _avg.value ?? 0,
        min: _min.value ?? 0,
        max: _max.value ?? 0,
        score: _avg.score ?? 0,
      };
    });

  const previousAvg =
    (await prisma.metricData
      .aggregate({
        where: { report_id: { in: previousReportIds }, performance_metric_id: performanceMetricId },
        _avg: { value: true },
      })
      .then((result) => result._avg.value)) ?? 0;

  return { data, diff: calculatePercentageDifference(stats.avg, previousAvg), ...stats };
};

export const calculatePerformance = (
  params: Record<'fcp' | 'si' | 'lcp' | 'tbt' | 'cls', number>,
): number => {
  const { cls, fcp, lcp, si, tbt } = params;

  const score = Math.round(fcp * 0.1 + si * 0.1 + lcp * 0.25 + tbt * 0.3 + cls * 0.25);

  return +`0${score}`.slice(-2);
};
