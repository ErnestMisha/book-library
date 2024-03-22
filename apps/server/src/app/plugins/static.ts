import fp from 'fastify-plugin';
import { fastifyStatic, FastifyStaticOptions } from '@fastify/static';
import { config } from '../../config';
import { join } from 'path';

export default fp<FastifyStaticOptions>(async (fastify) => {
  if (config.environment === 'development') {
    fastify.register(fastifyStatic, {
      root: join(__dirname, '..', '..', 'assets', 'books'),
      prefix: '/books/cover',
    });
  }
});
