/// <reference types='vitest' />
import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  plugins: [nxViteTsPaths()],

  test: {
    globals: true,
    cache: {
      dir: `${__dirname}/node_modules/.vitest`,
    },
    watch: false,
    reporters: ['default'],
  },
});
