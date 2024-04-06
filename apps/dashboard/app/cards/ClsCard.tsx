import { useLoaderData } from '@remix-run/react';
import { LayoutPanelTop } from 'lucide-react';

import ButtonCard from '@components/ButtonCard';
import CardHeader from '@components/CardHeader';
import CardStats from '@components/CardStats';

import { CLS } from '@constants/metricData';

import type { loader } from '@/routes/_index';

const ClsCard = () => {
  const { cls } = useLoaderData<typeof loader>();
  const { avg, diff, score } = cls;

  return (
    <ButtonCard value={CLS.abbreviation.toLowerCase()}>
      <CardHeader Icon={LayoutPanelTop} title={CLS.displayName} />

      <CardStats primaryText={avg.toFixed(3)} difference={diff} score={score} />
    </ButtonCard>
  );
};

export default ClsCard;
