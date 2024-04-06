import type { Result } from 'lighthouse';

import { getPerformanceAudits, getPerformanceMetricId } from '@utils/performance.js';

const lighthouseResult = { audits: {} } as unknown as Result;

test(`${getPerformanceMetricId.name}(): should returns the ID for a specific performance metric`, () => {
  const id = getPerformanceMetricId('first-contentful-paint');

  expect(id).toBe(1);
});

test(`${getPerformanceMetricId.name}(): should returns undefined for unknown performance metric`, () => {
  const id = getPerformanceMetricId('some-unknown-metric');

  expect(id).toBeUndefined();
});

test(`${getPerformanceAudits.name}(): should return an array of performance metrics`, () => {
  const result = getPerformanceAudits(lighthouseResult);

  expect(result.length).toBe(6);
  expect(result[0]).toMatchObject({ id: 1, actualValue: 0, displayValue: '', unit: '', score: 0 });
});
