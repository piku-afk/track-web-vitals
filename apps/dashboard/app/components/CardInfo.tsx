import { ActionIcon, Anchor, Tooltip } from '@mantine/core';
import { Info } from 'lucide-react';

interface CardInfoProps {
  label: string;
  href: string;
}

const CardInfo = (props: CardInfoProps) => {
  const { label, href } = props;

  return (
    <Tooltip multiline w={360} withinPortal label={label} position="top">
      <Anchor
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontSize: 16, lineHeight: '18px' }}
      >
        <ActionIcon variant="light" size="sm" radius="sm" bg="transparent">
          <Info color="#BD93F9" strokeWidth={2.5} size={16} />
        </ActionIcon>
      </Anchor>
    </Tooltip>
  );
};

export default CardInfo;
