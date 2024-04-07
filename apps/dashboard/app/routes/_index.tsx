import ClsCard from '@cards/ClsCard';
import FcpCard from '@cards/FcpCard';
import LcpCard from '@cards/LcpCard';
import PerformanceCard from '@cards/PerformanceCard';
import SiCard from '@cards/SiCard';
import TbtCard from '@cards/TbtCard';
import { Box, Container, Grid, SimpleGrid, Text, Title } from '@mantine/core';
import { nprogress } from '@mantine/nprogress';
import { defer, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node';
import { useNavigation, useSearchParams } from '@remix-run/react';
import { useEffect } from 'react';

import ChartCard from '@components/ChartCard';

import { getDateRange, getPreviousDateRange } from '@utils/filterUtils';
import { calculatePerformance, fetchMetricData, type Score } from '@utils/metricUtils.server';
import { getReports } from '@utils/reportUtils.server';

import { SearchParamKeys, type Duration } from '@constants/searchParams';

export const meta: MetaFunction = () => {
  return [
    { title: 'Track Web Vitals' },
    { name: 'description', content: 'Welcome to Track Web Vitals!' },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const duration = (new URL(request.url).searchParams.get('duration') ?? 'week') as Duration;

  // get reports
  const dateRange = getDateRange(duration);
  const previousDateRange = getPreviousDateRange(duration);

  const reportIds = await getReports(dateRange).then((reports) =>
    reports.map((report) => report.id),
  );
  const previousReportIds = await getReports(previousDateRange).then((reports) =>
    reports.map((report) => report.id),
  );

  // get metric data from reports
  const fcp = await fetchMetricData(reportIds, previousReportIds, 1);
  const lcp = await fetchMetricData(reportIds, previousReportIds, 2);
  const tbt = await fetchMetricData(reportIds, previousReportIds, 4);
  const cls = await fetchMetricData(reportIds, previousReportIds, 5);
  const si = await fetchMetricData(reportIds, previousReportIds, 6);

  // calculate performance
  const performance: { data: Score[]; avg: number } = {
    data: [],
    avg: calculatePerformance({
      fcp: fcp.score,
      cls: cls.score,
      lcp: lcp.score,
      si: si.score,
      tbt: tbt.score,
    }),
  };

  for (let i = 0; i < reportIds.length; i++) {
    const value = calculatePerformance({
      fcp: fcp.data[i].value,
      si: si.data[i].value,
      cls: cls.data[i].value,
      lcp: lcp.data[i].value,
      tbt: tbt.data[i].value,
    });

    performance.data.push({ id: i, created_at: fcp.data[i].created_at, unit: 'unitless', value });
  }

  return defer({ fcp, lcp, tbt, cls, si, performance });
};

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state } = useNavigation();

  useEffect(() => {
    if (state === 'idle') nprogress.complete();
    if (state === 'loading') nprogress.start();
  }, [state]);

  useEffect(() => {
    if (!searchParams.get(SearchParamKeys.duration)) {
      searchParams.set(SearchParamKeys.duration, 'week');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  return (
    <Container component="main" size="lg" px={{ base: 24, lg: 0 }} py={40}>
      <Box component="header">
        <Title>Track Web Vitals</Title>
        <Text mt={8}>Web Vitals Tracking for Optimal User Experience</Text>
      </Box>

      <Grid mt={40} gutter="xs">
        <Grid.Col visibleFrom="sm" span={{ xs: 12, md: 4 }}>
          <PerformanceCard visibleFrom="md" />
        </Grid.Col>

        <Grid.Col span={{ xs: 12, md: 8 }}>
          <ChartCard />
        </Grid.Col>
      </Grid>

      <Text mt="xl" mb="xs" size="sm" c="#B8B8B8">
        Click a tile to see its detailed data on the graph
      </Text>

      <SimpleGrid cols={{ base: 2, md: 3 }} spacing="sm" verticalSpacing="md">
        <PerformanceCard hiddenFrom="md" />
        <FcpCard />
        <SiCard />
        <LcpCard />
        <TbtCard />
        <ClsCard />
      </SimpleGrid>
    </Container>
  );
}
