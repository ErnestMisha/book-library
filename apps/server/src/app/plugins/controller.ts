import fp from 'fastify-plugin';
import { Books, Dto } from '../controllers';
import { Books as Model, books } from '../database';
import { config } from '../../config';
import { RouteHandler } from 'fastify';

export default fp(async (fastify, opts) => {
  const model = new Model();
  await model.connect();

  if (config.environment === 'development') {
    await model.seedData(books);
  }

  fastify.decorate('controller', new Books(model));
});

declare module 'fastify' {
  export interface FastifyInstance {
    controller: {
      list: RouteHandler<Dto['List']>;
      get: RouteHandler<Dto['Get']>;
      create: RouteHandler<Dto['Create']>;
      update: RouteHandler<Dto['Update']>;
      delete: RouteHandler<Dto['Delete']>;
    };
  }
}
