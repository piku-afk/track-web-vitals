import { Group, RingProgress, Text } from '@mantine/core';
import type { LucideIcon } from 'lucide-react';

import { getPerformanceColor } from '@utils/colorUtils';

import { useBreakpoints } from '@/hooks/useBreakpoints';

import CardTitle from './CardTitle';

interface CardHeaderProps {
  title: string;
  Icon: LucideIcon;
  score: number;
}

const CardHeader = (props: CardHeaderProps) => {
  const { Icon, title, score } = props;

  const roundedScore = Math.round(score);
  const formattedScore = roundedScore === 100 ? 100 : +`0${roundedScore}`.slice(-2);

  return (
    <Group component="header" gap={4} justify="flex-start">
      <Icon size={18} color="#B8B8B8" style={{ marginRight: 8 }} />
      <CardTitle>{title}</CardTitle>

      <Text size="lg" fw="bold" hiddenFrom="sm" ml="auto" c={getPerformanceColor(formattedScore)}>
        {formattedScore}
      </Text>
    </Group>
  );
};

export default CardHeader;
