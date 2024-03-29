import { LineChart } from '@mantine/charts';
import { useLoaderData } from '@remix-run/react';

import type { loader } from '@/routes/_index';

const getStrokeColor = (averageValue: number) => {
  if (averageValue > 3000) return '#FF5555';
  if (averageValue > 1800) return '#FFB86C';
  return '#50FA7B';
};

const FcpChart = () => {
  const { fcp } = useLoaderData<typeof loader>();
  const { avg, data, max, min } = fcp;

  const strokeColor = getStrokeColor(avg);

  return (
    <LineChart
      mt={32}
      h={200}
      unit=" ms"
      dataKey="created_at"
      curveType="linear"
      data={data}
      withYAxis={false}
      tooltipAnimationDuration={200}
      yAxisProps={{ domain: [min, max] }}
      series={[{ name: 'value', label: 'FCP', color: strokeColor }]}
    />
  );
};

export default FcpChart;
