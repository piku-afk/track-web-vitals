import { Group } from '@mantine/core';
import type { LucideIcon } from 'lucide-react';

import { useBreakpoints } from '@/hooks/useBreakpoints';

import CardTitle from './CardTitle';

interface CardHeaderProps {
  title: string;
  Icon: LucideIcon;
}

const CardHeader = (props: CardHeaderProps) => {
  const { Icon, title } = props;
  const { isXs } = useBreakpoints();

  return (
    <Group component="header" gap={4} justify={isXs ? 'center' : 'flex-start'}>
      <Icon size={18} color="#B8B8B8" style={{ marginRight: 8 }} />
      <CardTitle>{title}</CardTitle>
    </Group>
  );
};

export default CardHeader;
