import { PrismaClient } from '@prisma/client';
import { logger } from '@utils/logger.js';
import { performanceMetricsData } from '@utils/performance.js';

const prisma = new PrismaClient();

try {
  logger.info('Start Seeding');

  await prisma.$connect();
  await prisma.performanceMetric.createMany({ data: performanceMetricsData });

  logger.info('Complete Seeding');
} catch (error) {
  logger.error('Error Seeding');
  logger.error(error);
} finally {
  await prisma.$disconnect();
}
