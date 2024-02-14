import fp from 'fastify-plugin';
import { booksSchema } from '../schemas';
import { FastifySchema } from 'fastify';

export default fp(async (fastify, opts) => {
  fastify.decorate('schema', booksSchema);
});

declare module 'fastify' {
  export interface FastifyInstance {
    schema: {
      list: { schema: FastifySchema };
      get: { schema: FastifySchema };
      create: { schema: FastifySchema };
      update: { schema: FastifySchema };
      delete: { schema: FastifySchema };
    };
  }
}
