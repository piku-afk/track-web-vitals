import { logger } from '@utils/logger.js';

const { pino, prettyDefault } = vi.hoisted(() => ({
  pino: vi.fn().mockReturnValue({ info: vi.fn() }),
  prettyDefault: vi.fn(),
}));

vi.mock('pino', () => {
  return { pino };
});

vi.mock('pino-pretty', () => {
  return { default: { default: prettyDefault } };
});

test('logger(): successfully initializes pino logger', () => {
  logger.info('hello');

  expect(pino).toBeCalled();
  expect(prettyDefault).toBeCalled();
});
