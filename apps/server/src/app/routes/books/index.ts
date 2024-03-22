import { FastifyPluginAsync } from 'fastify';

const books: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get('/', fastify.schema.list, fastify.handlers.list);
  fastify.get('/:isbn', fastify.schema.get, fastify.handlers.get);
  fastify.post('/', fastify.schema.create, fastify.handlers.create);
  fastify.patch('/:isbn', fastify.schema.update, fastify.handlers.update);
  fastify.delete('/:isbn', fastify.schema.delete, fastify.handlers.delete);
  fastify.put(
    '/:isbn/cover',
    fastify.schema.uploadBookCover,
    fastify.handlers.uploadBookCover,
  );
};

export default books;
