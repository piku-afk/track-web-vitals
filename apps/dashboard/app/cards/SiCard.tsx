import { useLoaderData } from '@remix-run/react';
import { Zap } from 'lucide-react';

import ButtonCard from '@components/ButtonCard';
import CardHeader from '@components/CardHeader';
import CardStats from '@components/CardStats';

import { SI } from '@constants/metricData';

import type { loader } from '@/routes/_index';

const SiCard = () => {
  const { si } = useLoaderData<typeof loader>();
  const { avg, diff, score } = si;

  return (
    <ButtonCard value={SI.abbreviation.toLowerCase()}>
      <CardHeader Icon={Zap} title={SI.displayName} />

      <CardStats primaryText={`${avg.toFixed(2)} ms`} difference={diff} score={score} />
    </ButtonCard>
  );
};

export default SiCard;
