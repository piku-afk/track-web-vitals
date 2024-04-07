import { useLoaderData } from '@remix-run/react';
import { LayoutPanelTop } from 'lucide-react';

import ButtonCard from '@components/ButtonCard';
import CardHeader from '@components/CardHeader';
import CardStats from '@components/CardStats';

import { useBreakpoints } from '@hooks/useBreakpoints';

import { CLS } from '@constants/metricData';

import type { loader } from '@/routes/_index';

const ClsCard = () => {
  const { cls } = useLoaderData<typeof loader>();
  const { avg, diff, score } = cls;
  const { isXs } = useBreakpoints();

  return (
    <ButtonCard value={CLS.abbreviation.toLowerCase()}>
      <CardHeader
        Icon={LayoutPanelTop}
        title={isXs ? CLS.abbreviation : CLS.displayName}
        score={score}
      />

      <CardStats primaryText={avg.toFixed(3)} difference={diff} score={score} />
    </ButtonCard>
  );
};

export default ClsCard;
