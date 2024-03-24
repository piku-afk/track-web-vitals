import { LineChart } from '@mantine/charts';
import { useLoaderData } from '@remix-run/react';
import { useMemo } from 'react';

import { getFcpData, getStrokeColor } from '@utils/fcpUtils';

import { loader } from '@/routes/_index';

const FcpChart = () => {
  const { reports, average } = useLoaderData<typeof loader>();

  const fcpData = useMemo(() => getFcpData(reports), [reports]);
  const fcpValues = fcpData.map((data) => data.FCP);
  const minFcp = Math.min(...fcpValues);
  const maxFcp = Math.max(...fcpValues);

  const strokeColor = getStrokeColor(average);

  return (
    <LineChart
      mt={32}
      h={200}
      unit=" ms"
      dataKey="date"
      curveType="linear"
      data={fcpData}
      withYAxis={false}
      tooltipAnimationDuration={200}
      yAxisProps={{ domain: [minFcp, maxFcp] }}
      series={[{ name: 'FCP', color: strokeColor }]}
    />
  );
};

export default FcpChart;
