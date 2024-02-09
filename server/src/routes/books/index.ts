import { FastifyPluginAsync } from 'fastify';

const books: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get('/', fastify.schema.list, fastify.controller.list);
  fastify.get('/:isbn', fastify.schema.get, fastify.controller.get);
  fastify.post('/', fastify.schema.create, fastify.controller.create);
  fastify.patch('/:isbn', fastify.schema.update, fastify.controller.update);
  fastify.delete('/:isbn', fastify.schema.delete, fastify.controller.delete);
};

export default books;
