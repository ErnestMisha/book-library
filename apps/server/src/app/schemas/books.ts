import {
  getBookSchema,
  createBookSchema,
  updateBookSchema,
  listBooksSchema,
} from '@book-library/shared';
import z from 'zod';

export const booksSchema = {
  list: {
    schema: {
      description: 'returns list of books isbn',
      tags: ['books'],
      additionalProperties: false,
      querystring: listBooksSchema
        .pick({ offset: true })
        .extend({ limit: z.coerce.number().int().min(0).max(100) }),
      response: {
        200: listBooksSchema,
      },
    },
  },
  get: {
    schema: {
      description: 'returns book with given isbn',
      tags: ['books'],
      additionalProperties: false,
      params: listBooksSchema.shape.books.element.pick({ isbn: true }),
      response: {
        200: getBookSchema,
      },
    },
  },
  create: {
    schema: {
      description: 'creates book',
      tags: ['books'],
      additionalProperties: false,
      body: createBookSchema,
      response: {
        201: listBooksSchema.shape.books.element.pick({ isbn: true }),
      },
    },
  },
  update: {
    schema: {
      description: 'updates amount of available book copies for given isbn',
      tags: ['books'],
      additionalProperties: false,
      body: updateBookSchema,
      params: listBooksSchema.shape.books.element.pick({ isbn: true }),
      response: {
        204: z.null(),
      },
    },
  },
  delete: {
    schema: {
      description: 'deletes book with given isbn',
      tags: ['books'],
      additionalProperties: false,
      params: listBooksSchema.shape.books.element.pick({ isbn: true }),
      response: {
        204: z.null(),
      },
    },
  },
  uploadBookCover: {
    schema: {
      description: 'upload book cover for given isbn',
      tags: ['books'],
      params: listBooksSchema.shape.books.element.pick({ isbn: true }),
      response: {
        204: z.null(),
      },
    },
  },
};
