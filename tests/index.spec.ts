import { main } from 'src/index.js';

const {
  startBrowser,
  getBrowserPort,
  closeBrowser,

  checkDatabaseHealth,
  saveAudit,

  runLighthouse,

  logger,
} = vi.hoisted(() => ({
  startBrowser: vi.fn().mockReturnValue({}),
  getBrowserPort: vi.fn().mockReturnValue(3000),
  closeBrowser: vi.fn(),

  checkDatabaseHealth: vi.fn().mockReturnValue(false),
  saveAudit: vi.fn(),

  runLighthouse: vi.fn(),

  logger: vi.fn(),
}));

vi.mock('@utils/browser.js', () => {
  return {
    closeBrowser,
    getBrowserPort,
    startBrowser,
  };
});

vi.mock('@utils/database.js', () => {
  return {
    checkDatabaseHealth,
    saveAudit,
  };
});

vi.mock('@utils/lighthouse', () => {
  return { runLighthouse };
});

vi.mock('@utils/logger', () => {
  return { logger: { info: logger } };
});

test('conducts full Lighthouse audit flow with headless Chrome ', async () => {
  await main('https://www.test.url');

  expect(checkDatabaseHealth).toHaveBeenCalledOnce();
  expect(startBrowser).toHaveBeenCalledOnce();
  expect(getBrowserPort).toHaveBeenCalledOnce();
  expect(runLighthouse).toHaveBeenCalledOnce();
  expect(saveAudit).toHaveBeenCalledOnce();
  expect(closeBrowser).toHaveBeenCalledOnce();
  expect(logger).toBeCalled();
});
