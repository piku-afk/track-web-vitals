import { Box, Group, RingProgress, Text } from '@mantine/core';
import { useSearchParams } from '@remix-run/react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

import { getPerformanceColor } from '@utils/colorUtils';

import { useBreakpoints } from '@/hooks/useBreakpoints';

interface CardStatsProps {
  primaryText: string;
  difference: number;
  score: number;
}

const CardStats = (props: CardStatsProps) => {
  const { difference, primaryText, score } = props;
  const isDifferencePositive = difference < 0;
  const { isXs } = useBreakpoints();
  const [searchParams] = useSearchParams();
  const duration = searchParams.get('duration') ?? 'week';

  const formattedScore = +`0${Math.round(score)}`.slice(-2);

  return (
    <Group mt={8} justify={isXs ? 'center' : 'flex-start'}>
      {!isXs && (
        <Box>
          <Group align="flex-end" gap="xs">
            <Text fz={18} lh={1.32} fw={600}>
              {primaryText}
            </Text>
            <Text fw={600} style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: 14 }} className={isDifferencePositive ? 'success' : 'error'}>
                {Math.round(Math.abs(difference))}%
              </span>
              {isDifferencePositive ? (
                <ArrowUpRight size={18} className="success" />
              ) : (
                <ArrowDownRight size={18} className="error" />
              )}
            </Text>
          </Group>
          <Text size="xs" mt={2} c="#B8B8B8">
            Compared to previous {duration}
          </Text>
        </Box>
      )}

      <RingProgress
        ml={{ sm: 'auto' }}
        roundCaps
        size={80}
        thickness={8}
        label={
          <Text size="lg" ta="center">
            {formattedScore}
          </Text>
        }
        sections={[{ value: formattedScore, color: getPerformanceColor(formattedScore) }]}
      />
    </Group>
  );
};

export default CardStats;
