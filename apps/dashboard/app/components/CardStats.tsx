import { Box, Group, Text, UnstyledButton } from '@mantine/core';
import { ArrowDownRight, ArrowUpRight, ChevronDown } from 'lucide-react';

interface CardStatsProps {
  primaryText: string;
  difference: number;
  onClick: () => void;
}

const CardStats = (props: CardStatsProps) => {
  const { difference, primaryText, onClick } = props;
  const isDifferencePositive = difference > 0;

  return (
    <UnstyledButton onClick={onClick}>
      <Group>
        <Box>
          <Group mt="lg" align="flex-end" gap="xs">
            <Text fz={24} lh={1.32} fw={600}>
              {primaryText}
            </Text>
            <Text fz="sm" fw={600} style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: 16 }} className={isDifferencePositive ? 'success' : 'error'}>
                {Math.round(Math.abs(difference))}%
              </span>
              {isDifferencePositive ? (
                <ArrowUpRight size={20} className="success" />
              ) : (
                <ArrowDownRight size={20} className="error" />
              )}
            </Text>
          </Group>
          <Text size="sm" mt={4} c="#B8B8B8">
            Compared to previous week
          </Text>
        </Box>

        <ChevronDown
          style={{
            marginLeft: 'auto',
            // rotate: showChart ? '-180deg' : 'none',
          }}
          color="#B8B8B8"
        />
      </Group>
    </UnstyledButton>
  );
};

export default CardStats;
