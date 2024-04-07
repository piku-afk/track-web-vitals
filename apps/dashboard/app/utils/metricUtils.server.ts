import { db } from '@/db/index.server';

import { calculatePercentageDifference } from './filterUtils';

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
  const data = await db
    .selectFrom('MetricData as m')
    .where('report_id', 'in', reportIds)
    .where('performance_metric_id', '=', performanceMetricId)
    .leftJoin('Report as r', 'm.report_id', 'r.id')
    .select(['m.id', 'r.created_at as created_at', 'value', 'unit'])
    .execute()
    .then((result) =>
      result.map((data) => ({
        ...data,
        created_at: data.created_at?.toLocaleString('en-IN', { dateStyle: 'long' }),
      })),
    );

  const { avg, max, min, score } = await db
    .selectFrom('MetricData')
    .where('report_id', 'in', reportIds)
    .where('performance_metric_id', '=', performanceMetricId)
    .select((eb) => [
      eb.fn.avg<number>('value').as('avg'),
      eb.fn.max<number>('value').as('max'),
      eb.fn.min<number>('value').as('min'),
      eb.fn.avg<number>('score').as('score'),
    ])
    .executeTakeFirstOrThrow();

  const { prev_avg } = await db
    .selectFrom('MetricData')
    .where('report_id', 'in', previousReportIds)
    .where('performance_metric_id', '=', performanceMetricId)
    .select((eb) => eb.fn.avg<number>('value').as('prev_avg'))
    .executeTakeFirstOrThrow();

  return {
    data,
    diff: calculatePercentageDifference(avg, prev_avg),
    avg,
    max,
    min,
    score: score,
  };
};

export const calculatePerformance = (
  params: Record<'fcp' | 'si' | 'lcp' | 'tbt' | 'cls', number>,
): number => {
  const { cls, fcp, lcp, si, tbt } = params;

  const score = Math.round(fcp * 0.1 + si * 0.1 + lcp * 0.25 + tbt * 0.3 + cls * 0.25);

  return +`0${score}`.slice(-2);
};
