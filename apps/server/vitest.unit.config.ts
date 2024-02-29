/// <reference types='vitest' />
import commonConfig from '../../vite.config';
import { defineProject, mergeConfig } from 'vitest/config';

export default mergeConfig(
  commonConfig,
  defineProject({
    test: {
      include: ['src/**/*unit.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
  })
);
