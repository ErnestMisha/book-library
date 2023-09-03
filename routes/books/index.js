import { Books } from "../../database/models/books.js";

export default async function (fastify, opts) {
  fastify.get(
    "/",
    {
      schema: {
        description: "returns list of books isbn",
        tags: ["books"],
        additionalProperties: false,
        response: {
          200: {
            description: "Successful response",
            type: "array",
            items: {
              type: "object",
              properties: {
                isbn: { type: "string" },
              },
            },
          },
        },
      },
    },
    async function (request, reply) {
      return Books.listBooks();
    }
  );
}
