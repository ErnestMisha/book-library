import { FastifyPluginAsync } from 'fastify';
import { Book } from '../../database';
import {
  listBooksSchema,
  getBookSchema,
  createBookSchema,
  updateBookSchema,
  deleteBookSchema
} from '../../schemas';
import { CollectionDocuments } from '@mysql/xdevapi';

const books: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get(
    '/',
    {
      schema: listBooksSchema
    },
    async () => {
      return Book.listBooks();
    }
  );

  fastify.get<{ Params: { isbn: string } }>(
    '/:isbn',
    {
      schema: getBookSchema
    },
    async (request, reply) => {
      const book = await Book.getBook(request.params.isbn);

      if (!book) {
        return reply.notFound();
      }

      return book;
    }
  );

  fastify.post<{ Body: CollectionDocuments & { isbn: string } }>(
    '/',
    {
      schema: createBookSchema
    },
    async function (request) {
      await Book.createBook(request.body);

      return { isbn: request.body.isbn };
    }
  );

  fastify.patch<{
    Params: { isbn: string };
    Body: { available: boolean };
  }>('/:isbn', { schema: updateBookSchema }, async function (request) {
    await Book.updateBook(request.params.isbn, request.body.available);

    return { isbn: request.params.isbn };
  });

  fastify.delete<{ Params: { isbn: string } }>(
    '/:isbn',
    { schema: deleteBookSchema },
    async function (request) {
      await Book.deleteBook(request.params.isbn);
    }
  );
};

export default books;
