import { closeBrowser, getBrowserPort, startBrowser } from '@utils/browser.js';
import { checkDatabaseHealth, saveAudit } from '@utils/database.js';
import { logger } from '@utils/logger.js';

logger.info('Start Browser');
const browser = await startBrowser();

const port = getBrowserPort(browser);
logger.info(`Browser Port: ${port}`);

logger.info('Close Browser');
await closeBrowser(browser);
