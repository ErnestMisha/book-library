import { Books } from "../../database/models/books.js";
import { listBooksSchema, getBookSchema } from "../../schemas/books.js";

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
}
