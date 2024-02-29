/// <reference types='vitest' />
import commonConfig from '../../vite.config';
import { defineProject, mergeConfig } from 'vitest/config';

export default mergeConfig(
  commonConfig,
  defineProject({
    test: {
      include: [
        'src/**/*integration.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      ],
      poolOptions: { threads: { singleThread: true } },
      server: {
        deps: {
          inline: ['@fastify/autoload'],
        },
      },
    },
  })
);
