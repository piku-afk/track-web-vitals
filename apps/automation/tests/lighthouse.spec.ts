import { runLighthouse } from '@utils/lighthouse.js';

const lighthouseSpy = vi.hoisted(() => vi.fn().mockReturnValue({ lhr: {} }));
vi.mock('lighthouse', () => {
  return { default: lighthouseSpy };
});

test(`${runLighthouse.name}(): generates Lighthouse report for provided URL`, async () => {
  const result = await runLighthouse('https://www.example.com', 3000);

  expect(lighthouseSpy).toBeCalled();
  expect(result).toBeDefined();
});
