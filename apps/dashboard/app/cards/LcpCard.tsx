import { useLoaderData } from '@remix-run/react';
import { Package2 } from 'lucide-react';

import ButtonCard from '@components/ButtonCard';
import CardHeader from '@components/CardHeader';
import CardStats from '@components/CardStats';

import { LCP } from '@constants/metricData';

import type { loader } from '@/routes/_index';

const LcpCard = () => {
  const { lcp } = useLoaderData<typeof loader>();
  const { avg, diff, score } = lcp;

  return (
    <ButtonCard value={LCP.abbreviation.toLowerCase()}>
      <CardHeader Icon={Package2} title={LCP.displayName} />

      <CardStats primaryText={`${avg.toFixed(2)} ms`} difference={diff} score={score} />
    </ButtonCard>
  );
};

export default LcpCard;
