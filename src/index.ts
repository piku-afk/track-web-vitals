import { closeBrowser, getBrowserPort, startBrowser } from '@utils/browser.js';
import { checkDatabaseHealth, saveAudit } from '@utils/database.js';
import { runLighthouse } from '@utils/lighthouse.js';
import { logger } from '@utils/logger.js';

const url = 'https://www.nimbbl.biz';


logger.info('Start Browser');
const browser = await startBrowser();

const port = getBrowserPort(browser);
logger.info(`Browser Port: ${port}`);

logger.info(`Run Lighthouse: ${url}`);
const result = await runLighthouse(url, port);

logger.info('Close Browser');
await closeBrowser(browser);
