export const listBooksSchema = {
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
};

export const getBookSchema = {
  description: "returns book with given isbn",
  tags: ["books"],
  additionalProperties: false,
  params: {
    isbn: { type: "string" },
  },
  response: {
    200: {
      description: "Successful response",
      type: "object",
      properties: {
        title: { type: "string" },
        isbn: { type: "string" },
        authors: {
          type: "array",
          items: {
            type: "string",
          },
        },
        edition: { type: "number" },
        length: { type: "number" },
        totalAmount: { type: "number" },
        available: { type: "number" },
      },
    },
  },
};
