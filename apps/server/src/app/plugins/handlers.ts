import fp from 'fastify-plugin';
import { getHandlers, Handlers } from '../handlers';
import { Books, books } from '../database';
import { config } from '../../config';

export default fp(async (fastify, opts) => {
  const model = new Books();
  await model.connect();
  const res = await model.list(1, 0);

  if (config.environment === 'development' && !res[1]) {
    await model.seedData(books);
  }

  fastify.decorate('handlers', getHandlers(model));
});

declare module 'fastify' {
  export interface FastifyInstance {
    handlers: Handlers;
  }
}
