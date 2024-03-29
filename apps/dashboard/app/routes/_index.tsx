import { nprogress } from '@mantine/nprogress';
import { defer, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node';
import { useNavigation, useSearchParams } from '@remix-run/react';
import { useEffect } from 'react';

import {
  calculatePercentageDifference,
  getDateRange,
  getPreviousDateRange,
  type Duration,
} from '@utils/filterUtils';

export const meta: MetaFunction = () => {
  return [
    { title: 'Track Web Vitals' },
    { name: 'description', content: 'Welcome to Track Web Vitals!' },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const prisma = new PrismaClient();
  const duration = new URL(request.url).searchParams.get('duration') as Duration;
  const { endDate, startDate } = getDateRange(duration ?? 'week');
  const previousDateRange = getPreviousDateRange(duration ?? 'week');

  const reports = await prisma.report
    .findMany({
      where: {
        created_at: {
          lte: endDate,
          gte: startDate,
        },
      },
      select: {
        id: true,
        created_at: true,
        MetricData: {
          include: { PerformanceMetric: { select: { name: true } } },
        },
      },
    })
    .then((reports) =>
      reports.map((report) => {
        const { id, created_at, MetricData } = report;

        const metricData = MetricData?.map((data) => {
          const { PerformanceMetric, id, displayValue, unit, value } = data;
          const { name } = PerformanceMetric;

          return { name, id, unit, value, displayValue };
        });

        return { id, created_at, metricData };
      }),
    );

  const average =
    (await prisma.metricData
      .aggregate({
        where: {
          report_id: {
            in: await prisma.report
              .findMany({
                where: {
                  created_at: {
                    lte: endDate,
                    gte: startDate,
                  },
                },
                select: { id: true },
              })
              .then((reports) => reports.map((reports) => reports.id)),
          },
        },
        _avg: {
          value: true,
        },
      })
      .then((result) => result._avg.value)) ?? 0;

  const previousAverage =
    (await prisma.metricData
      .aggregate({
        where: {
          report_id: {
            in: await prisma.report
              .findMany({
                where: {
                  created_at: {
                    lte: previousDateRange.endDate,
                    gte: previousDateRange.startDate,
                  },
                },
                select: { id: true },
              })
              .then((reports) => reports.map((reports) => reports.id)),
          },
        },
        _avg: {
          value: true,
        },
      })
      .then((result) => result._avg.value)) ?? 0;

  return defer({
    reports,
    average,
    difference: calculatePercentageDifference(average, previousAverage),
  });
};

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state } = useNavigation();

  useEffect(() => {
    if (state === 'idle') nprogress.complete();
    if (state === 'loading') nprogress.start();
  }, [state]);

  useEffect(() => {
    if (!searchParams.get('duration')) {
      setSearchParams({ duration: 'week' });
    }
  }, [searchParams, setSearchParams]);

  return (
    <Container component="main" size="lg" px={24} py={40}>
      <Box component="header">
        <Title>Track Web Vitals</Title>
        <Text mt={8}>Web Vitals Tracking for Optimal User Experience</Text>
      </Box>

      <SimpleGrid cols={{ xs: 1, sm: 2 }} spacing={24}>
        <FcpCard />
        <LcpChart />
      </SimpleGrid>
    </Container>
  );
}
