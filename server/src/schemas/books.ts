import { bookSchema, updateBookSchema } from '@book-library/shared/schemas';
import z from 'zod';

const params = z.object({ isbn: z.string().length(13) });
const isbnSchema = z.object({ isbn: z.number().int().min(1000000000000).max(9999999999999) });

export const booksSchema = {
  list: {
    schema: {
      description: 'returns list of books isbn',
      tags: ['books'],
      additionalProperties: false,
      response: {
        200: isbnSchema.array()
      }
    }
  },
  get: {
    schema: {
      description: 'returns book with given isbn',
      tags: ['books'],
      additionalProperties: false,
      params,
      response: {
        200: bookSchema
      }
    }
  },
  create: {
    schema: {
      description: 'creates book',
      tags: ['books'],
      additionalProperties: false,
      body: bookSchema,
      response: {
        200: isbnSchema
      }
    }
  },
  update: {
    schema: {
      description: 'updates amount of available book copies for given isbn',
      tags: ['books'],
      additionalProperties: false,
      body: updateBookSchema,
      params,
      response: {
        200: isbnSchema
      }
    }
  },
  delete: {
    schema: {
      description: 'deletes book with given isbn',
      tags: ['books'],
      additionalProperties: false,
      params,
      response: {
        204: z.null()
      }
    }
  }
};
