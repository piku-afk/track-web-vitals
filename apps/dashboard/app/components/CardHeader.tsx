import { Group } from '@mantine/core';
import type { LucideIcon } from 'lucide-react';

import CardInfo from './CardInfo';
import CardTitle from './CardTitle';

interface CardHeaderProps {
  title: string;
  description: string;
  link: string;
  Icon: LucideIcon;
}

const CardHeader = (props: CardHeaderProps) => {
  const { description, Icon, link, title } = props;

  return (
    <Group component="header" gap={6}>
      <CardTitle>{title}</CardTitle>
      <CardInfo label={description} href={link} />

      <Icon size={18} color="#B8B8B8" style={{ marginLeft: 'auto' }} />
    </Group>
  );
};

export default CardHeader;
