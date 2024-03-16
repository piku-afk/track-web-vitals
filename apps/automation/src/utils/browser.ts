import puppeteer, { type Browser, type PuppeteerLaunchOptions } from 'puppeteer';

const puppeteerConfig: PuppeteerLaunchOptions = {
  headless: 'shell',
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--no-first-run',
    '--no-zygote',
    '--single-process',
    '--disable-gpu',
  ],
};

export const startBrowser = async (): Promise<Browser> => {
  return await puppeteer.launch(puppeteerConfig);
};

export const getBrowserPort = (browser: Browser): number => {
  const websocketUrl = new URL(browser.wsEndpoint());

  return +websocketUrl.port;
};

export const closeBrowser = async (browser: Browser): Promise<void> => {
  return await browser.close();
};
