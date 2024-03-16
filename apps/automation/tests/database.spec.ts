import { checkDatabaseHealth, saveAudit } from '@utils/database.js';
import { logger } from '@utils/logger.js';
import * as performanceUtil from '@utils/performance.js';
import type { Result } from 'lighthouse';

const { $queryRaw, create, createMany } = vi.hoisted(() => ({
  $queryRaw: vi.fn().mockReturnValue([{ health: 1 }]),
  create: vi.fn().mockReturnValue({ id: 0 }),
  createMany: vi.fn(),
}));

vi.mock('@prisma/client', () => {
  return {
    PrismaClient: vi.fn().mockReturnValue({
      $queryRaw,
      report: {
        create,
      },
      metricData: {
        createMany,
      },
    }),
  };
});

const url = 'https://www.test.url';
const performanceMetric = { id: undefined, actualValue: 0, displayValue: '', unit: '' };
const lighthouseResult = { audits: {} } as unknown as Result;
const errorSpy = vi.spyOn(logger, 'error').mockImplementation(vi.fn());
const getPerformanceAuditsSpy = vi
  .spyOn(performanceUtil, 'getPerformanceAudits')
  .mockReturnValue([performanceMetric]);

test(`${checkDatabaseHealth.name}(): verifies database connection`, async () => {
  const validConnection = await checkDatabaseHealth();

  expect(validConnection).toBeTruthy();

  $queryRaw.mockReturnValueOnce([{ health: 0 }]);
  const invalidConnection = await checkDatabaseHealth();

  expect(invalidConnection).toBeFalsy();
});

test(`${saveAudit.name}(): logs error for undefined lighthouse report`, async () => {
  await saveAudit(url, undefined);

  expect(errorSpy).toBeCalled();
});

test(`${saveAudit.name}(): saves lighthouse report in database`, async () => {
  const { actualValue, displayValue, unit } = performanceMetric;

  await saveAudit(url, lighthouseResult);

  expect(getPerformanceAuditsSpy).toBeCalled();
  expect(create).toBeCalled();
  expect(createMany).toBeCalled();
  expect(createMany).toHaveBeenCalledWith({
    data: [{ unit, displayValue, performance_metric_id: -1, value: actualValue, report_id: 0 }],
  });
});
