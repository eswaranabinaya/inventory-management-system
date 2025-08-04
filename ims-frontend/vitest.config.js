import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: [
      'src/**/*.test.{js,jsx,ts,tsx}',
      'test/**/*.test.{js,jsx,ts,tsx}'
    ],
    environment: 'jsdom',
    globals: true,
    setupFiles: [],
  },
});