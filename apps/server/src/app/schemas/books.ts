import {
  getBookSchema,
  updateBookSchema,
  listBooksSchema,
} from '@book-library/shared';
import z from 'zod';

const params = z.object({ isbn: z.string().length(13) });

export const booksSchema = {
  list: {
    schema: {
      description: 'returns list of books isbn',
      tags: ['books'],
      additionalProperties: false,
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
      params,
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
      body: getBookSchema,
      response: {
        201: z.object({
          isbn: z.number().int().min(1000000000000).max(9999999999999),
        }),
      },
    },
  },
  update: {
    schema: {
      description: 'updates amount of available book copies for given isbn',
      tags: ['books'],
      additionalProperties: false,
      body: updateBookSchema,
      params,
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
      params,
      response: {
        204: z.null(),
      },
    },
  },
};
