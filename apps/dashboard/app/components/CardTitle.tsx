import { Title } from '@mantine/core';
import type { FC, PropsWithChildren } from 'react';

const CardTitle: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <Title size="h4" order={3} c="#B8B8B8">
      {children}
    </Title>
  );
};

export default CardTitle;
