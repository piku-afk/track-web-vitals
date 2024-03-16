import { closeBrowser, getBrowserPort, startBrowser } from '@utils/browser.js';

const { close, launch } = vi.hoisted(() => {
  const close = vi.fn();
  const browser = {
    close,
    wsEndpoint: vi.fn().mockReturnValue('http://127.0.0.1:3000'),
    version: vi.fn().mockReturnValue('HeadlessChrome/122.0.6261.111'),
  };

  return { close, launch: vi.fn().mockReturnValue(browser) };
});

vi.mock('puppeteer', () => {
  return { default: { launch } };
});

test(`${startBrowser.name}(): starts headless Chrome browser`, async () => {
  const browser = await startBrowser();
  const browserVersion = await browser.version();
  await closeBrowser(browser);

  expect(launch).toBeCalled();
  expect(browserVersion).toContain('Headless');
});

test(`${getBrowserPort.name}(): ensures browser port exists upon browser start`, async () => {
  const browser = await startBrowser();
  const wsEndpointSpy = vitest.spyOn(browser, 'wsEndpoint');

  const port = getBrowserPort(browser);
  await closeBrowser(browser);

  expect(wsEndpointSpy).toBeCalled();
  expect(port).toBeDefined();
  expect(typeof port).toBe('number');
});

test(`${closeBrowser.name}(): closes headless Chrome browser`, async () => {
  const browser = await startBrowser();

  await closeBrowser(browser);

  expect(close).toBeCalled();
  expect(browser.connected).toBeFalsy();
});
