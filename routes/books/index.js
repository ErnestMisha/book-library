import { Books } from "../../database/models/books.js";
import {
  listBooksSchema,
  getBookSchema,
  createBookSchema,
  updateBookSchema,
  deleteBookSchema,
} from "../../schemas/books.js";

export default async function (fastify, opts) {
  fastify.get(
    "/",
    {
      schema: listBooksSchema,
    },
    async function (request, reply) {
      return Books.listBooks();
    }
  );

  fastify.get(
    "/:isbn",
    {
      schema: getBookSchema,
    },
    async function (request, reply) {
      const book = await Books.getBook(request.params.isbn);

      if (!book) {
        return reply.notFound();
      }

      return book;
    }
  );

  fastify.post(
    "/",
    {
      schema: createBookSchema,
    },
    async function (request, reply) {
      await Books.createBook(request.body);

      return { isbn: request.body.isbn };
    }
  );

  fastify.patch(
    "/:isbn",
    { schema: updateBookSchema },
    async function (request, reply) {
      await Books.updateBook(request.params.isbn, request.body.available);

      return { isbn: request.params.isbn };
    }
  );

  fastify.delete(
    "/:isbn",
    { schema: deleteBookSchema },
    async function (request, reply) {
      await Books.deleteBook(request.params.isbn);
    }
  );
}
