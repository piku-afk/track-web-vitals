import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['html', 'lcov'],
      exclude: ['prisma/**'],
    },
  },
});
