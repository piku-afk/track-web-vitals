import { PrismaClient } from '@prisma/client';
import type { Result } from 'lighthouse';

import { logger } from './logger.js';
import { getPerformanceAudits } from './performance.js';

const prisma = new PrismaClient();

export const checkDatabaseHealth = async (): Promise<boolean> => {
  const result = await prisma.$queryRaw<Array<Record<'health', number>>>`SELECT 1 as health`;

  if (result[0].health) {
    return true;
  }

  return false;
};

export const saveAudit = async (url: string, result: Result | undefined): Promise<void> => {
  if (!result) {
    logger.error('Lighthouse result is not defined');
    return;
  }

  const performanceAudit = getPerformanceAudits(result);

  const report = await prisma.report.create({
    data: { url, type: 'MOBILE' },
    select: { id: true },
  });

  await prisma.metricData.createMany({
    data: performanceAudit.map((audit) => {
      const { actualValue, displayValue, unit, id } = audit;

      return {
        displayValue,
        performance_metric_id: id ?? -1,
        report_id: report.id,
        unit,
        value: actualValue,
      };
    }),
  });
};
