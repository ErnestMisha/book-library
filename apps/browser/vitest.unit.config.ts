/// <reference types='vitest' />
import commonConfig from '../../vitest.config';
import { defineProject, mergeConfig } from 'vitest/config';

export default mergeConfig(
  commonConfig,
  defineProject({
    test: {
      environment: 'jsdom',
      include: [
        'src/tests/**/*unit.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      ],
    },
  })
);
