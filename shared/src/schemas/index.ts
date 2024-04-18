import { z } from 'zod';

export const listBooksSchema = z.object({
  books: z.array(
    z.object({
      isbn: z.coerce
        .number()
        .int()
        .min(1_000_000_000_000, {
          message: 'ISBN number must contain 13 digits',
        })
        .max(9_999_999_999_999, {
          message: 'ISBN number must contain 13 digits',
        }),
      title: z
        .string()
        .min(5, { message: 'Title must contain at least 5 characters' })
        .max(200, { message: 'Title must contain at most 200 characters' }),
      authors: z
        .string()
        .min(5, { message: 'Authors name must contain at least 5 characters' })
        .max(80, { message: 'Authors name must contain at most 80 characters' })
        .array()
        .nonempty(),
      edition: z.number().int().min(1).max(30),
      coverExtension: z.string().min(2).max(10).nullable(),
    }),
  ),
  offset: z.coerce.number().int().min(0),
  totalCount: z.number().int().min(0),
});

export const getBookSchema = listBooksSchema.shape.books.element.extend({
  availableCount: z.number().int().min(0).max(10000),
  totalCount: z.number().int().min(1).max(10000),
  length: z.number().int().min(5).max(2000),
});

export const createBookSchema = getBookSchema.omit({ coverExtension: true });

export const updateBookSchema = getBookSchema
  .pick({
    availableCount: true,
    totalCount: true,
  })
  .partial();
