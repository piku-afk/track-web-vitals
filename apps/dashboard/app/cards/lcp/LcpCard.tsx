import { Card } from '@mantine/core';
import { Package2 } from 'lucide-react';

import CardHeader from '@components/CardHeader';

import { LCP } from '@constants/metricData';

const LcpCard = () => {
  return (
    <Card component="section" className="card" my={24} withBorder radius="md" shadow="xl" p={24}>
      <CardHeader
        Icon={Package2}
        description={LCP.description}
        link={LCP.documentationLink}
        title={LCP.displayName}
      />
    </Card>
  );
};

export default LcpCard;
