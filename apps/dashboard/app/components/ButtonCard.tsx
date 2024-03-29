import { Button, Card, type BoxProps } from '@mantine/core';
import { useSearchParams } from '@remix-run/react';
import type { FC, PropsWithChildren } from 'react';

import { SearchParamKeys } from '@constants/searchParams';

interface ButtonCardProps {
  value: string | null;
  visibleFrom?: BoxProps['visibleFrom'];
  hiddenFrom?: BoxProps['hiddenFrom'];
}

const ButtonCard: FC<PropsWithChildren<ButtonCardProps>> = (props) => {
  const { children, hiddenFrom, value, visibleFrom } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const active = searchParams.get(SearchParamKeys.selected) === value;

  const handleClick = () => {
    if (typeof value === 'string' && value) {
      searchParams.set(SearchParamKeys.selected, value);
    } else {
      searchParams.delete(SearchParamKeys.selected);
    }

    setSearchParams(searchParams);
  };

  return (
    <Button
      visibleFrom={visibleFrom}
      hiddenFrom={hiddenFrom}
      size="xl"
      px={0}
      fullWidth
      h="100%"
      justify="flex-start"
      className="card"
      ta="left"
      radius="md"
      styles={{
        root: active ? { borderColor: '#BD93F9', borderWidth: 2 } : undefined,
        label: { width: '100%' },
      }}
      onClick={handleClick}
    >
      <Card component="section" bg="transparent" w="100%" p={{ xs: 16, sm: 24 }}>
        {children}
      </Card>
    </Button>
  );
};

export default ButtonCard;
