import { FastifyPluginAsync } from 'fastify';
import { Book } from '../../database';
import { booksSchema } from '../../schemas';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

const books: FastifyPluginAsync = async (fastify, opts) => {
  fastify.withTypeProvider<ZodTypeProvider>().get('/', booksSchema.list, (req, rep) => {
    return Book.listBooks();
  });

  fastify
    .withTypeProvider<ZodTypeProvider>()
    .get('/:isbn', booksSchema.get, async (request, reply) => {
      const book = await Book.getBook(Number(request.params.isbn));

      if (!book) {
        return reply.notFound();
      }

      return book;
    });

  fastify
    .withTypeProvider<ZodTypeProvider>()
    .post('/', booksSchema.create, async function (request) {
      await Book.createBook(request.body);

      return { isbn: request.body.isbn };
    });

  fastify
    .withTypeProvider<ZodTypeProvider>()
    .patch('/:isbn', booksSchema.update, async function (request) {
      const isbn = Number(request.params.isbn);

      await Book.updateBook(isbn, request.body.availableCount);

      return { isbn };
    });

  fastify
    .withTypeProvider<ZodTypeProvider>()
    .delete('/:isbn', booksSchema.delete, async function (request) {
      await Book.deleteBook(Number(request.params.isbn));
    });
};

export default books;
