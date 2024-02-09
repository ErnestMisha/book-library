import fp from 'fastify-plugin';
import { Books } from '../controllers';
import { RouteHandler } from 'fastify';
import { Dto } from '../controllers/dto';

export default fp(async (fastify, opts) => {
  fastify.decorate('controller', new Books());
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
