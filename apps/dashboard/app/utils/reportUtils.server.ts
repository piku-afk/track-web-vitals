import { db } from '../db/index.server';

interface GetReportsProps {
  startDate: Date;
  endDate: Date;
}

export interface Report {
  id: number;
  created_at: Date | null;
}

export const getReports = async ({ startDate, endDate }: GetReportsProps): Promise<Report[]> => {
  return await db
    .selectFrom('Report')
    .where('created_at', '>=', startDate)
    .where('created_at', '<=', endDate)
    .select(['id', 'created_at'])
    .execute();
};
