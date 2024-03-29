import { prisma } from './prisma.server';

interface GetReportsProps {
  startDate: Date;
  endDate: Date;
}

export interface Report {
  id: number;
  created_at: Date | null;
}

export const getReports = async ({ startDate, endDate }: GetReportsProps): Promise<Report[]> => {
  return await prisma.report.findMany({
    where: {
      created_at: {
        lte: endDate,
        gte: startDate,
      },
    },
    select: { id: true, created_at: true },
  });
};
