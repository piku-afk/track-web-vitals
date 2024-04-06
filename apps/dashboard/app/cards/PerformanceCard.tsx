import {
  Anchor,
  Group,
  HoverCard,
  RingProgress,
  Table,
  Text,
  Title,
  type BoxProps,
} from '@mantine/core';
import { useLoaderData } from '@remix-run/react';
import { Info } from 'lucide-react';

import ButtonCard from '@components/ButtonCard';

import { getPerformanceColor } from '@utils/colorUtils';

import { CLS, FCP, LCP, SI, TBT } from '@constants/metricData';

import type { loader } from '@/routes/_index';

const weightage = [
  { name: FCP.displayName, value: 0.1 },
  { name: SI.displayName, value: 0.1 },
  { name: LCP.displayName, value: 0.25 },
  { name: TBT.displayName, value: 0.3 },
  { name: CLS.displayName, value: 0.25 },
];

interface PerformanceCardProps {
  visibleFrom?: BoxProps['visibleFrom'];
  hiddenFrom?: BoxProps['hiddenFrom'];
}

const PerformanceCard = (props: PerformanceCardProps) => {
  const { hiddenFrom, visibleFrom } = props;
  const { performance } = useLoaderData<typeof loader>();

  const { avg } = performance;

  return (
    <ButtonCard value={null} hiddenFrom={hiddenFrom} visibleFrom={visibleFrom}>
      <Group justify="center" mb="xl" gap="xs">
        <Title size="h3" order={2}>
          Overall Performance
        </Title>

        <HoverCard>
          <HoverCard.Target>
            <Info size={18} color="#BD93F9" />
          </HoverCard.Target>

          <HoverCard.Dropdown w={320} bg="#212529" style={{ border: 'none' }}>
            <Text size="sm">The Performance score is a weighted average of the metric scores.</Text>

            <Table mt="sm" withRowBorders={false}>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Audit</Table.Th>
                  <Table.Th>Weighage</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {weightage.map((weight) => (
                  <Table.Tr key={weight.name}>
                    <Table.Td>{weight.name}</Table.Td>
                    <Table.Td>{weight.value * 100}%</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>

              <Table.Caption ta="left">
                Learn more about how&nbsp;
                <Anchor
                  size="sm"
                  href="https://developer.chrome.com/docs/lighthouse/performance/performance-scoring"
                  rel="noreferrer noopener"
                  target="_blank"
                  c="#BD93F9"
                >
                  performance score is calculated
                </Anchor>
                .
              </Table.Caption>
            </Table>
          </HoverCard.Dropdown>
        </HoverCard>
      </Group>

      <RingProgress
        mx="auto"
        size={176}
        thickness={14}
        roundCaps
        label={
          <Text fz={40} fw={700} ta="center" size="xl">
            {avg}
          </Text>
        }
        sections={[{ value: avg, color: getPerformanceColor(avg) }]}
      />

      <Text mt="lg" size="sm" ta="center" c="#B8B8B8">
        for the previous week
      </Text>
    </ButtonCard>
  );
};

export default PerformanceCard;
