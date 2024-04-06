import { LineChart } from '@mantine/charts';
import { Card } from '@mantine/core';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { useMemo } from 'react';

import { getMetricColor, getPerformanceColor } from '@utils/colorUtils';

import { CLS, FCP, LCP, SI, TBT } from '@constants/metricData';
import { SearchParamKeys } from '@constants/searchParams';

import type { loader } from '@/routes/_index';

const ChartCard = () => {
  const reports = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const selectedTile = searchParams.get(SearchParamKeys.selected);

  const { data, label, max, color } = useMemo(() => {
    switch (selectedTile) {
      case FCP.abbreviation.toLowerCase():
        return {
          ...reports.fcp,
          label: FCP.abbreviation,
          max: 4000,
          color: getMetricColor(FCP.abbreviation, reports.fcp.avg),
        };
      case SI.abbreviation.toLowerCase():
        return {
          ...reports.si,
          max: 3500,
          label: SI.abbreviation,
          color: getMetricColor(SI.abbreviation, reports.si.avg),
        };
      case LCP.abbreviation.toLowerCase():
        return {
          ...reports.lcp,
          max: 4500,
          label: LCP.abbreviation,
          color: getMetricColor(LCP.abbreviation, reports.lcp.avg),
        };
      case TBT.abbreviation.toLowerCase():
        return {
          ...reports.tbt,
          max: 700,
          label: TBT.abbreviation,
          color: getMetricColor(TBT.abbreviation, reports.tbt.avg),
        };
      case CLS.abbreviation.toLowerCase():
        return {
          ...reports.cls,
          max: 0.3,
          label: CLS.abbreviation,
          color: getMetricColor(CLS.abbreviation, reports.cls.avg),
        };
      default:
        return {
          ...reports.performance,
          label: 'Performance',
          max: 100,
          color: getPerformanceColor(reports.performance.avg),
        };
    }
  }, [reports, selectedTile]);

  const valueFormatter = (value: number): string => {
    switch (selectedTile) {
      case CLS.abbreviation.toLowerCase():
        return value.toFixed(3);
      case FCP.abbreviation.toLowerCase():
      case LCP.abbreviation.toLowerCase():
      case TBT.abbreviation.toLowerCase():
      case SI.abbreviation.toLowerCase():
        return `${Math.round(value)} ms`;
      default:
        return String(value);
    }
  };

  return (
    <Card component="section" bg="transparent" py={8} px={{ xs: 0, md: 16 }} ml={{ md: 16 }}>
      <LineChart
        h={340}
        data={data}
        dataKey="created_at"
        tooltipAnimationDuration={250}
        valueFormatter={valueFormatter}
        yAxisProps={{ domain: [0, max] }}
        series={[{ name: 'value', label, color }]}
        curveType="linear"
      />
    </Card>
  );
};

export default ChartCard;
