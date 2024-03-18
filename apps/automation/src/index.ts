import { closeBrowser, getBrowserPort, startBrowser } from '@utils/browser.js';
import { checkDatabaseHealth, saveAudit } from '@utils/database.js';
import { runLighthouse } from '@utils/lighthouse.js';
import { logger } from '@utils/logger.js';

export const main = async (url: string) => {
  const databaseHealth = await checkDatabaseHealth();
  logger.info(`Database Health: ${databaseHealth}`);

  logger.info('Start Browser');
  const browser = await startBrowser();

  const port = getBrowserPort(browser);
  logger.info(`Browser Port: ${port}`);

  logger.info(`Run Lighthouse: ${url}`);
  const result = await runLighthouse(url, port);

  logger.info('Save Audit');
  await saveAudit(url, result);

  logger.info('Close Browser');
  await closeBrowser(browser);
};

const url = 'https://www.nimbbl.biz';

main(url);
