import { Card, Collapse } from '@mantine/core';
import { useLoaderData } from '@remix-run/react';
import type { loader } from 'app/routes/_index';
import { Paintbrush2 } from 'lucide-react';
import { useState } from 'react';

import CardHeader from '@components/CardHeader';
import CardStats from '@components/CardStats';

import { FCP } from '@constants/metricData';

import FcpChart from './FcpChart';

const FcpCard = () => {
  const { average, difference } = useLoaderData<typeof loader>();
  const [showChart, setShowChart] = useState(false);

  return (
    <Card component="section" className="card" my={24} withBorder radius="md" shadow="xl" p={24}>
      <CardHeader
        Icon={Paintbrush2}
        description={FCP.description}
        link={FCP.documentationLink}
        title={`${FCP.displayName} (${FCP.abbreviation})`}
      />

      <CardStats
        primaryText={`${average.toFixed(2)} ms`}
        onClick={() => setShowChart((prev) => !prev)}
        difference={-difference}
      />

      <Collapse in={showChart}>
        <FcpChart />
      </Collapse>
    </Card>
  );
};

export default FcpCard;
