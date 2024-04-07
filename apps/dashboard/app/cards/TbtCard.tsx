import { useLoaderData } from '@remix-run/react';
import { Timer } from 'lucide-react';

import ButtonCard from '@components/ButtonCard';
import CardHeader from '@components/CardHeader';
import CardStats from '@components/CardStats';

import { useBreakpoints } from '@hooks/useBreakpoints';

import { TBT } from '@constants/metricData';

import type { loader } from '@/routes/_index';

const TbtCard = () => {
  const { tbt } = useLoaderData<typeof loader>();
  const { avg, diff, score } = tbt;
  const { isXs } = useBreakpoints();

  return (
    <ButtonCard value={TBT.abbreviation.toLowerCase()}>
      <CardHeader Icon={Timer} title={isXs ? TBT.abbreviation : TBT.displayName} score={score} />

      <CardStats primaryText={`${avg.toFixed(2)} ms`} difference={diff} score={score} />
    </ButtonCard>
  );
};

export default TbtCard;
