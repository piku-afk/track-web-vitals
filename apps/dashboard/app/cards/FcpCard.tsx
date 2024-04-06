import { useLoaderData } from '@remix-run/react';
import type { loader } from 'app/routes/_index';
import { Paintbrush2 } from 'lucide-react';

import ButtonCard from '@components/ButtonCard';
import CardHeader from '@components/CardHeader';
import CardStats from '@components/CardStats';

import { FCP } from '@constants/metricData';

import { useBreakpoints } from '@/hooks/useBreakpoints';

const FcpCard = () => {
  const { fcp } = useLoaderData<typeof loader>();
  const { avg, diff, score } = fcp;
  const { isXs, isSm } = useBreakpoints();

  return (
    <ButtonCard value={FCP.abbreviation.toLowerCase()}>
      <CardHeader Icon={Paintbrush2} title={isXs ? FCP.abbreviation : FCP.displayName} />

      <CardStats primaryText={`${avg.toFixed(2)} ms`} difference={diff} score={score} />
    </ButtonCard>
  );
};

export default FcpCard;
